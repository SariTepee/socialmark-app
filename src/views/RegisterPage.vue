<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Register</h3>
    <input
      v-model="userData.fullname"
      type="text"
      placeholder="Full Name"
      class="input mb-3"
    />
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
    <button class="default-button" @click="onSave">Register</button>
    <span class="text-center mt-3 text-sm">
      I already have an account,
      <router-link
        :to="{ name: 'LoginPage' }"
        class="text-red-900 hover:text-black"
      >
        Log in!
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: null,
        fullname: null,
        password: null,
      },
    };
  },

  methods: {
    async onSave() {
      const password = this.$CryptoJS.AES.encrypt(
        this.userData.password,
        this.$store.getters._saltKey
      ).toString();

      await this.$appAxios.post("/users", {
        ...this.userData,
        password,
      });

      this.$router.push({ name: "HomePage" });

      // const encryptedPassword = this.$CryptoJS.AES.decrypt(
      //   cryptedPassword,
      //   key
      // ).toString(this.$CryptoJS.enc.Utf8);

      // console.log(cryptedPassword);
      // console.log(encryptedPassword);
    },
  },
};
</script>

<style></style>
