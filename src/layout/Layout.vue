<script setup>
import Cookies from 'js-cookie';

const token = computed(() => { return Cookies.get('token') }) 
</script>

<template>
  <QLayout view="lHh Lpr lFf">
    <QPageContainer>
      <QHeader v-if="token" :key="token" :class="$q.dark.isActive ? 'bg-primary' : 'bg-black'">
        <QToolbar>
          <QBtn flat @click="drawer = !drawer" round dense icon="menu" />
          <QToolbarTitle>Header</QToolbarTitle>
        </QToolbar>
      </QHeader>

      <QDrawer v-if="token" :key="token" v-model="drawer" show-if-above :width="200" :breakpoint="500">
        <QScrollArea class="fit">
          <QList padding class="menu-list">
            <QItem clickable v-ripple>
              <QItemSection avatar>
                <QIcon name="inbox" />
              </QItemSection>

              <QItemSection>
                Inbox
              </QItemSection>
            </QItem>

            <QItem active clickable v-ripple>
              <QItemSection avatar>
                <QIcon name="star" />
              </QItemSection>

              <QItemSection>
                Star
              </QItemSection>
            </QItem>

            <QItem clickable v-ripple>
              <QItemSection avatar>
                <QIcon name="send" />
              </QItemSection>

              <QItemSection>
                Send
              </QItemSection>
            </QItem>

            <QItem clickable v-ripple>
              <QItemSection avatar>
                <QIcon name="drafts" />
              </QItemSection>

              <QItemSection>
                Drafts
              </QItemSection>
            </QItem>
          </QList>
        </QScrollArea>
      </QDrawer>
      <QPage>
        <slot />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
