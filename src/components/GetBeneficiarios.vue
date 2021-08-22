<template>
  <Beneficiarios :beneficiarios="this.$store.state.beneficiarios" />
</template>

<script>
import Beneficiarios from "@/components/Beneficiarios.vue";
export default {
  components: {
    Beneficiarios,
  },
};
</script>

<style>
</style>