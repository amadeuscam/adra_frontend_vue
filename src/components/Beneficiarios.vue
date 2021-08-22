<template>
  <div>
    <div class="row altura_ben">
      <Beneficiario v-for="ben of beneficiarios" :key="ben.id" :persona="ben" />
    </div>

    <div class="altura_pag">
      <a-pagination
        v-model="current"
        
        :defaultPageSize="20"
        :total="records"
        show-less-items
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import Beneficiario from "@/components/Beneficiario.vue";

export default {
  props: ["beneficiarios"],
  components: {
    Beneficiario,
  },
  data() {
    return {
      current: this.$store.state.page,
    };
  },
  computed: {
    records() {
      if (this.$store.state.load) {
        this.current = this.$store.state.page_url;
        return this.$store.state.records;
      }
    },
  },

  methods: {
    onChange() {
      this.$store.dispatch("paginate_control", this.current);
    },
  },
};
</script>

<style scoped>
.altura_ben {
  height: 94vh;
  overflow-y: auto;
  padding-top: 10px;
}
.altura_pag {
  height: 6vh;
  width: 100%;
  float: left;
  justify-content: center;
  display: flex;
  align-items: center;
}
.Page {
  color: red !important;
}
.VuePagination__count {
  display: none;
}
.VuePagination__pagination {
  margin: 0 !important;
}
.dsa {
  height: 4vh !important;
  margin-bottom: 0;
  background: red;
}
</style>