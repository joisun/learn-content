<a target="_blank" :href="$github_base_url + filePath">open in github</a>

<script setup lang="ts">
import { useData } from "vitepress"
const {page:{value:{filePath}}} = useData()

</script>
