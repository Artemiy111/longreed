<script setup>defineProps({progress:Number})</script><template><div class="reading-progress" aria-hidden="true"><div :style="{transform:`scaleX(${progress})`}"></div></div></template>
