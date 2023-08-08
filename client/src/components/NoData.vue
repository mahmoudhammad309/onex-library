<template>
    <div class="no-data-wrapper">
      <img :src="backgroundImage" alt="no data" />
    </div>
  </template>
  
  <script>
  import backgroundImage from "../assets/NoData.svg";
  
  export default {
    data: () => ({
      backgroundImage,
    }),
  };
  </script>
  
  <style scoped>
  .no-data-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;
  }
  
  .no-data-wrapper img {
    max-width: 400px;
    max-height: 400px;
  }
  </style>