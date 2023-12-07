<a target="_blank" :href="$github_base_url + recoverPathStr">open in github</a>

<script setup lang="ts">
import { useData } from "vitepress"
const {page:{value:{filePath}}} = useData()
const filePathArray = filePath.split('/')
filePathArray.pop();
const recoverPathStr = filePathArray.join('/')
</script>
