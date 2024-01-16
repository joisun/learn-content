<script setup lang="ts">
import User from './User.vue'; 
</script>
<template>


  <User gender="male" country="us">
    <template #default="slotProps">User Id:{{ slotProps.id }}</template>
    <!-- <template v-slot:default="slotProps">User Id:{{slotProps.id}}</template> -->
    <template #userinfo="{ user: { cell, email, picture: { thumbnail }, name: { title, first, last } } }">
      <!-- <template v-slot:userinfo="{user:{cell,email,picture:{thumbnail},name:{title,first,last}}}"> -->
      <img :src="thumbnail" alt="">
      <p>User Name: {{ title + '.' + first + ' ' + last }}</p>
      <p>Emial: {{ email }}</p>
      <p>Cell: {{ cell }}</p>
    </template>
  </User>

  <User gender="female" country="ch">
    <template #default="slotProps">User Id:{{ slotProps.id }}</template>
    <!-- <template v-slot:default="slotProps">User Id:{{slotProps.id}}</template> -->
    <template #userinfo="{ user: { cell, email, picture: { thumbnail }, name: { title, first, last } } }">
      <!-- <template v-slot:userinfo="{user:{cell,email,picture:{thumbnail},name:{title,first,last}}}"> -->
      <img :src="thumbnail" alt="">
      <p>User Name: {{ title + '.' + first + ' ' + last }}</p>
      <p>Emial: {{ email }}</p>
      <p>Cell: {{ cell }}</p>
    </template>
  </User>
</template>