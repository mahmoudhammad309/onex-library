<template>
  <div class="user-data-wrapper">
    <v-avatar color="red">
      <span class="white--text text-h6">{{
        `${user?.firstName[0]?.toUpperCase()}${user?.lastName[0]?.toUpperCase()}`
      }}</span>
    </v-avatar>
    <div>
      <p class="font-weight-bold">
        {{ `${user?.firstName} ${user?.lastName}` }}
      </p>
      <p class="font-weight-light">{{ `${user?.email}` }}</p>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
};
</script>

<style scoped>
.user-data-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
}
</style>
