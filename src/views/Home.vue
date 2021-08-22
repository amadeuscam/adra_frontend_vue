<template>
  <div class="home">
    <GetBeneficiarios />
  </div>
</template>

<script>
// @ is an alias to /src
import GetBeneficiarios from "@/components/GetBeneficiarios.vue";

export default {
  name: "Home",
  components: {
    GetBeneficiarios,
  },
  mounted() {
    if (this.$store.getters.logginIn) {
      this.$store.dispatch("get_beneficiarios");
    }
  },
};
</script>
<style>
</style>
