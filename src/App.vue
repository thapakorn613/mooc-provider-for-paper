<template>
  <div id="app">
    <nav-bar
      v-if="loggedIn"
      :currentUser="currentUser"
      :showAdminBoard="showAdminBoard"
      :showModeratorBoard="showModeratorBoard"
      :logOut="logOut"
    ></nav-bar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toSignInAndSignOut: true,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }
      return false;
    },
  },
  async mounted() {},
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus">
body
  direction: ltr;
  height: 100%;
  background: url('./assets/images/bg4-resize.jpg') center center fixed;

#app
  height: 100%;
</style>