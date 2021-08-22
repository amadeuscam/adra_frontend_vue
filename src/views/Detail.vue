<template>
  <div class="detail">
    <div class="row">
      <div class="col-12 col-sm-12 col-lg-6">
        <a-descriptions title="User Info" bordered>
          <a-descriptions-item label="Nombre">
         {{ ben.nombre_apellido }}
          </a-descriptions-item>
          <a-descriptions-item label="Billing Mode">
            Prepaid
          </a-descriptions-item>
          <a-descriptions-item label="Automatic Renewal">
            YES
          </a-descriptions-item>
          <a-descriptions-item label="Order time">
            2018-04-24 18:00:00
          </a-descriptions-item>
          <a-descriptions-item label="Usage Time" :span="2">
            2019-04-24 18:00:00
          </a-descriptions-item>
          <a-descriptions-item label="Status" :span="3">
            <a-badge status="processing" text="Running" />
          </a-descriptions-item>
          <a-descriptions-item label="Negotiated Amount">
            $80.00
          </a-descriptions-item>
          <a-descriptions-item label="Discount"> $20.00 </a-descriptions-item>
          <a-descriptions-item label="Official Receipts">
            $60.00
          </a-descriptions-item>
          <a-descriptions-item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="col-12 col-sm-12 col-lg-6">

            <!-- <h1>hola soy {{ ben.nombre_apellido }}</h1> -->
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      ben: Object,
    };
  },

  mounted() {
    console.log(this.$store.state.beneficiarios);
    this.ben = this.$store.getters.get_beneficario_data(
      parseInt(this.$route.params.id)
    );
    console.log(this.ben);
  },
};
</script>

<style>
</style>