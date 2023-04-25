<template>
  <app-header />
  <div class="flex flex-row">
    <sidebar-component @category-changed="updateBookmarkList" />
    <app-bookmark-list
      :bookmarks="bookmarkList"
      v-if="bookmarkList.length > 0"
    />
    <div class="bookmark" v-else><b>No bookmarks have been added yet</b></div>
  </div>
</template>

<script>
import SidebarComponent from "@/components/Home/SidebarComponent.vue";
export default {
  components: {
    SidebarComponent,
  },
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.$socket.on("NEW_BOOKMARK_ADDED", (bookmark) => {
      this.bookmarkList.push(bookmark);
    });
  },
  methods: {
    updateBookmarkList(categoryId) {
      const url = categoryId
        ? `/bookmarks?_expand=category&categoryId=${categoryId}`
        : `/bookmarks?_expand=category`;
      this.$appAxios.get(url).then((response) => {
        // console.log(response);
        this.bookmarkList = response.data;
      });
    },
    fetchData() {
      this.$appAxios.get("/bookmarks?_expand=category").then((response) => {
        this.bookmarkList = response.data;
      });
    },
  },
};
</script>

<style>
.bookmark {
  margin: auto;
  padding: 15px;
  font-size: 25px;
  color: #efefef;
  border: 5px solid #303030;
  background-color: #606060;
  border-radius: 30px;
}
</style>
