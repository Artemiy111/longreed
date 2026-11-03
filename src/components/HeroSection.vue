<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue'
import {usePreferredReducedMotion} from '@vueuse/core'
import gsap from 'gsap'
const root=ref(null), reduced=usePreferredReducedMotion();let ctx
defineEmits(['start'])
onMounted(()=>{if(reduced.value!=='reduce')ctx=gsap.context(()=>{gsap.from('.hero-word',{y:70,opacity:0,duration:1.1,stagger:.14,ease:'expo.out'});gsap.from('.hero-art',{opacity:0,scale:.93,duration:1.8,ease:'power2.out'});gsap.to('.hero-art',{y:110,scrollTrigger:{trigger:root.value,start:'top top',end:'bottom top',scrub:1}})},root.value)})
onBeforeUnmount(()=>ctx?.revert())
</script>
<template><header ref="root" class="hero" id="top">
<div class="hero-top"><a href="#top" class="brand" aria-label="Облака / Капитал — в начало"><span class="brand-mark"></span> ОБЛАКА / КАПИТАЛ</a><span>ИНТЕРНЕТ-ТЕХНОЛОГИИ · ЛР 3</span><a href="#sources">ИСТОЧНИКИ ↗</a></div>
<div class="hero-grid"><div class="hero-copy"><p class="eyebrow"><span class="live-dot"></span> ИНФРАСТРУКТУРА ЦИФРОВЫХ ФИНАНСОВ</p><h1><span class="hero-word">Облака</span><span class="hero-word">и <em>капитал.</em></span></h1><p class="hero-deck">Как облачные вычисления меняют банки, биржи и само устройство доверия.</p><button class="start-reading" @click="$emit('start','why')">Начать чтение <span>↓</span></button></div>
<div class="hero-art" aria-hidden="true"><div class="orbital orbit-one"></div><div class="orbital orbit-two"></div><div class="art-grid"></div><div class="server-stack"><div class="server server-1"><b>01</b><span>COMPUTE</span><i></i></div><div class="server server-2"><b>02</b><span>INTELLIGENCE</span><i></i></div><div class="server server-3"><b>03</b><span>TRUST</span><i></i></div></div><span class="art-tag art-tag-top">ДАННЫЕ → РЕШЕНИЯ</span><span class="art-tag art-tag-bottom"><i></i> РАСПРЕДЕЛЁННОЕ ДОВЕРИЕ</span><div class="art-cross cross-one">+</div><div class="art-cross cross-two">+</div></div></div>
<div class="hero-bottom"><p>Набойщиков А.А. <span>ИДМ-26-03 · МГТУ «СТАНКИН»</span></p><p>08 глав <span>≈ 25 минут чтения</span></p><p>29.10.2026 <span>Исследование и визуальный рассказ</span></p></div>
</header></template>

