<template>
  <div class="user-data-wrapper">
    <v-avatar color="red">
      <span class="white--text text-h6">{{ `${user?.firstName[0]}${user?.lastName[0]}` }}</span>
    </v-avatar>
    <div>
      <p class="font-weight-bold">
        {{ `${user?.firstName}${user?.lastName}` }}
      </p>
      <p class="font-weight-light">        {{ `${user?.email}` }}
    </p>
    </div>
  </div>
</template>

<script>
import UserServices from "@/services/userServices";

export default {
  data: () => ({
    user: null,
  }),
  mounted() {
    this.gethUserData();
  },
  methods: {
    gethUserData: function () {
        console.log('***************')
        console.log(UserServices.getUser())
      this.user = UserServices.getUser();
    },
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
