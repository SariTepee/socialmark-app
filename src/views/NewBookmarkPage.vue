<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
    <input
      v-model="userData.title"
      type="text"
      placeholder="Başlık"
      class="input mb-3"
      autofocus
      ref="title"
    />
    <input
      v-model="userData.url"
      type="text"
      placeholder="URL"
      class="input mb-3"
    />
    <select v-model="userData.categoryId" class="input mb-3">
      <option disabled selected value="">Select category</option>
      <option
        v-for="category in categoryList"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <textarea
      v-model="userData.description"
      placeholder="Açıklama"
      class="input mb-3"
      cols="30"
      rows="10"
    ></textarea>
    <div class="flex items-center justify-end gap-x-1">
      <button
        class="secondary-button"
        @click="$router.push({ name: 'HomePage' })"
      >
        Cancel
      </button>
      <button class="default-button" @click="onSave">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      categoryList: [],
      userData: {
        title: null,
        url: null,
        categoryId: null,
        description: null,
      },
    };
  },
  async mounted() {
    const responseData = await this.$appAxios.get("/categories");
    this.categoryList = responseData?.data || [];
  },
  methods: {
    async onSave() {
      // console.log(this.getCurrentUser);
      const postData = {
        username: this.getCurrentUser?.username,
        userId: this.getCurrentUser?.id,
        ...this.userData,
        date: new Date().toJSON(),
      };
      await this.$appAxios.post("/bookmarks", postData);
      this.$socket.emit("NEW_BOOKMARK_EVENT", {
        ...postData,
        category: this.categoryList?.find((c) => (c.id = postData.categoryId)),
      });
      this.clear();
    },
    clear() {
      Object.keys(this.userData)?.forEach((field) => {
        this.userData[field] = null;
      });
    },
  },
  computed: {
    ...mapGetters(["getCurrentUser"]),
  },
};
</script>

<style></style>
