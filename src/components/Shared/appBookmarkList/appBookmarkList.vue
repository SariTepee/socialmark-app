<template>
  <div>
    <div class="p-2 grid grid-cols-8 gap-4">
      <bookmark-list-item
        v-for="(bookmark, index) in bookmarks"
        :key="index"
        :bookmark="bookmark"
      />
    </div>
  </div>
</template>

<script>
import BookmarkListItem from "./BookmarkListItem.vue";
export default {
  components: {
    BookmarkListItem,
  },
  props: {
    bookmarks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style></style>
