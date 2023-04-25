<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Log In</h3>
    <input
      v-model="userData.username"
      type="text"
      placeholder="User Name"
      class="input mb-3"
    />
    <input
      v-model="userData.password"
      type="password"
      placeholder="Password"
      class="input mb-3"
    />
    <button class="default-button" @click="onSubmit">Log in</button>
    <span class="text-center mt-3 text-sm">
      I don't have an account
      <router-link
        :to="{ name: 'RegisterPage' }"
        class="text-red-900 hover:text-black"
        >Register!</router-link
      >
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      const response = await this.$appAxios.get(
        `/users?username=${this.userData.username}`
      );

      const user = response?.data[0];

      if (user != null) {
        const password = this.$CryptoJS.AES.decrypt(
          user.password,
          this.$store.getters._saltKey
        ).toString(this.$CryptoJS.enc.Utf8);

        if (password === this.userData.password) {
          this.$store.commit("setUser", user);
          this.$router.push({ name: "HomePage" });
        } else {
          alert("Şifre Hatalı");
        }
      } else {
        alert("Böyle biri yok!");
      }
    },
  },
};
</script>

<style></style>
