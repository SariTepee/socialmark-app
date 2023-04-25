<template>
  <app-header></app-header>
  <div class="flex flex-row">
    <side-bar></side-bar>
    <!-- <component
      :is="$route.meta.componentName"
      :bookmarks="bookmarkList"
      v-if="bookmarkList.length > 0"
    ></component> -->
    <app-bookmark-list
      v-if="bookmarkList.length > 0"
      :bookmarks="bookmarkList"
    ></app-bookmark-list>

    <div class="bookmark" v-else><b>No bookmarks have been added yet</b></div>

    <!-- <div class="socket">
      <input type="text" @keydown.enter="SEND_MESSAGE" />
    </div> -->
  </div>
</template>

<script>
import SideBar from "@/components/Account/SideBar";
// import AppBookmarkList from "@/components/Shared/appBookmarkList/appBookmarkList.vue";
export default {
  components: { SideBar },
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.$appAxios.get("/bookmarks?_expand=category").then((response) => {
      this.bookmarkList = response.data;
    });
  },
  mounted() {
    // this.$socket.on("WELCOME_MESSAGE", this.WELCOME_MESSAGE);
  },
  methods: {
    // WELCOME_MESSAGE(data) {
    //   console.log(data);
    // },
    // SEND_MESSAGE(e) {
    //   // console.log(e.target.value);
    //   this.$socket.emit("SEND_MESSAGE", e.target.value);
    // },
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
