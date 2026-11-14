<template>
  <div class="admin-messages-view">
    <!-- Header -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="page-headline mb-1">Client Inquiries & Messages</h1>
        <p class="text-muted mb-0 fs-7">Review and respond to client outreach, project requests, and messages submitted from the contact section.</p>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button
          type="button"
          class="btn btn-outline-secondary rounded-pill px-3 fs-7"
          @click="loadMessages"
        >
          <i class="bi bi-arrow-repeat me-1"></i> Refresh
        </button>
      </div>
    </div>

    <!-- Filter Pills -->
    <div class="d-flex flex-wrap align-items-center gap-2 mb-4">
      <button
        type="button"
        :class="['btn-filter rounded-pill px-3 py-1 fs-7 fw-bold', { active: filterStatus === 'all' }]"
        @click="filterStatus = 'all'"
      >
        All Messages ({{ messages.length }})
      </button>
      <button
        type="button"
        :class="['btn-filter rounded-pill px-3 py-1 fs-7 fw-bold', { active: filterStatus === 'unread' }]"
        @click="filterStatus = 'unread'"
      >
        Unread ({{ unreadCount }})
      </button>
      <button
        type="button"
        :class="['btn-filter rounded-pill px-3 py-1 fs-7 fw-bold', { active: filterStatus === 'read' }]"
        @click="filterStatus = 'read'"
      >
        Read ({{ messages.length - unreadCount }})
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="filteredMessages.length === 0" class="admin-panel p-5 rounded-4 text-center text-muted">
      <i class="bi bi-inbox-fill fs-1 d-block mb-3 text-secondary"></i>
      <h3 class="fs-5 fw-bold mb-1">No Messages Found</h3>
      <p class="mb-0 fs-7">There are no client inquiries matching the selected filter.</p>
    </div>

    <!-- Messages List -->
    <div v-else class="d-flex flex-column gap-3">
      <div
        v-for="msg in filteredMessages"
        :key="msg.id"
        :class="[
          'message-inbox-card p-4 rounded-4 transition-all',
          { 'is-unread': !msg.isRead }
        ]"
      >
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-2">
          <div class="d-flex align-items-center gap-3">
            <span :class="['status-dot', msg.isRead ? 'read' : 'unread']"></span>
            <div>
              <h3 class="sender-name mb-0 fs-6 fw-bold">{{ msg.name }}</h3>
              <a :href="`mailto:${msg.email}`" class="sender-email fs-8 text-decoration-none text-muted">
                {{ msg.email }}
              </a>
            </div>
          </div>

          <div class="d-flex align-items-center gap-2">
            <span class="message-time text-muted fs-8">{{ formatTime(msg.createdAt) }}</span>
            <button
              type="button"
              class="btn btn-sm btn-icon-round"
              :title="msg.isRead ? 'Mark as Unread' : 'Mark as Read'"
              @click="toggleReadState(msg)"
            >
              <i :class="['bi', msg.isRead ? 'bi-envelope' : 'bi-envelope-open']"></i>
            </button>
            <button
              type="button"
              class="btn btn-sm btn-icon-round text-danger"
              title="Delete Message"
              @click="confirmDeleteMessage(msg.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <h4 class="message-subject fs-7 fw-bold mb-1">{{ msg.subject || 'Direct Contact Form Submission' }}</h4>
        <p class="message-body-preview fs-7 text-secondary mb-3">{{ msg.message }}</p>

        <div class="d-flex align-items-center justify-content-between pt-2 border-top">
          <span v-if="msg.phone" class="text-muted fs-8">
            <i class="bi bi-telephone me-1"></i> {{ msg.phone }}
          </span>
          <span v-else class="text-muted fs-8">Online submission</span>

          <a
            :href="`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`"
            class="btn-reply-email text-decoration-none fs-8 fw-bold d-inline-flex align-items-center gap-1.5"
          >
            <i class="bi bi-reply-fill"></i>
            <span>Reply via Email</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePortfolioApi, type ContactMessageItem } from '~/composables/usePortfolioApi'

definePageMeta({
  layout: 'admin'
})

const { fetchMessages, markMessageAsRead, deleteMessage } = usePortfolioApi()

const messages = ref<ContactMessageItem[]>([])
const filterStatus = ref<'all' | 'unread' | 'read'>('all')

const unreadCount = computed(() => {
  return messages.value.filter(m => !m.isRead).length
})

const filteredMessages = computed(() => {
  if (filterStatus.value === 'unread') {
    return messages.value.filter(m => !m.isRead)
  }
  if (filterStatus.value === 'read') {
    return messages.value.filter(m => m.isRead)
  }
  return messages.value
})

const loadMessages = async () => {
  messages.value = await fetchMessages()
}

onMounted(() => {
  loadMessages()
})

const toggleReadState = async (msg: ContactMessageItem) => {
  const newState = !msg.isRead
  msg.isRead = newState
  await markMessageAsRead(msg.id, newState)
}

const confirmDeleteMessage = async (id: number) => {
  if (confirm('Delete this inquiry?')) {
    await deleteMessage(id)
    messages.value = messages.value.filter(m => m.id !== id)
  }
}

const formatTime = (isoString?: string) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.page-headline {
  font-family: var(--ff-syne), 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
}

.btn-filter {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

:global(.dark) .btn-filter {
  background-color: #17171d;
  border-color: #262632;
  color: #9ca3af;
}

.btn-filter.active {
  background-color: #e76f2b;
  border-color: #e76f2b;
  color: #ffffff;
}

.message-inbox-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

:global(.dark) .message-inbox-card {
  background-color: #121217;
  border-color: #22222a;
}

.message-inbox-card.is-unread {
  border-left: 4px solid #e76f2b;
  background-color: rgba(231, 111, 43, 0.03);
}

:global(.dark) .message-inbox-card.is-unread {
  background-color: rgba(231, 111, 43, 0.06);
}

.status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.status-dot.unread {
  background-color: #e76f2b;
  box-shadow: 0 0 6px #e76f2b;
}

.status-dot.read {
  background-color: #9ca3af;
}

.btn-icon-round {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
}

:global(.dark) .btn-icon-round {
  border-color: #2b2b36;
  color: #9ca3af;
}

.btn-icon-round:hover {
  background-color: #f3f4f6;
}

:global(.dark) .btn-icon-round:hover {
  background-color: #1c1c24;
}

.btn-reply-email {
  color: #e76f2b;
}

.btn-reply-email:hover {
  text-decoration: underline !important;
}

.fs-7 { font-size: 0.85rem; }
.fs-8 { font-size: 0.75rem; }
</style>
