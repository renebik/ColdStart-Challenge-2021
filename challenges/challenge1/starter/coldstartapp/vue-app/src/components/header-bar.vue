<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import AuthLogin from '@/components/auth-login.vue';
import AuthLogout from '@/components/auth-logout.vue';
import getUserInfo from '../assets/js/userInfo';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogin,
    AuthLogout,
  },
  data() {
    return {
      errorMessage: '',
      user: undefined,
    };
  },
  async created() {
    this.user = await getUserInfo();
  },
  methods: {
  },
};
</script>

<template>
  <header>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <HeaderBarBrand></HeaderBarBrand>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item nav-home" to="/">Home</router-link>
          <div class="navbar-item" v-if="!user">
            <AuthLogin provider="github"  />
          </div>
          <div class="navbar-item" v-if="user">
            {{ user.userDetails }}
          </div>
          <div class="navbar-item" v-if="user">
            <AuthLogout />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
