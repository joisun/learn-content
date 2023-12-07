<a target="_blank" :href="$vscode_base_url + filePath">open in vscode</a>

<script setup lang="ts">
import { useData } from "vitepress"
const {page:{value:{filePath}}} = useData()
</script>
