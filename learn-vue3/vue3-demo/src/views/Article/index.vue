<script setup lang="ts">
import ArticleHeaderVue from '@/components/Article/ArticleHeader.vue';
import ArticleMainVue from '@/components/Article/ArticleMain.vue';
import ArticleFooterVue from '@/components/Article/ArticleFooter.vue';
</script>

<template>
  <div class="p-5">
    <div class="article">
      <ArticleHeaderVue>
        <template #title>标题</template>
        <template #subtitle>我是一个副标题</template>
      </ArticleHeaderVue>
      <ArticleMainVue>
        <template #main-intro>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime possimus error magni at. Provident illum
          dolor in, cumque ex architecto!
        </template>
        <template #main-body>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit facere eius, similique accusantium sequi
          officia suscipit voluptatibus. Nostrum delectus odit distinctio nihil ut ex, quaerat culpa sunt sit quas nobis
          cumque modi voluptas quibusdam eum odio voluptatem tenetur expedita consequuntur, illo animi veritatis ipsum
          perspiciatis magnam. Repellat eum sunt est.
        </template>
        <template #main-summary>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam fugiat laudantium blanditiis dolorem optio!
          Fugit?
        </template>
      </ArticleMainVue>
      <ArticleFooterVue>
        <template #footer-writersaying>致此，Have A Nice Day !</template>
        <template #footer-date>二〇二二年八月十一日， 十九时三十分</template>
        <template #footer-writersign>Jayce.</template>
      </ArticleFooterVue>
    </div>
  </div>
</template>