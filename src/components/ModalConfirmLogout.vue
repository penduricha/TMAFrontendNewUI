<script>
export default {
  name: 'ModalConfirmLogout',
  data() {
    return {
      show: false
    }
  },
  methods: {
    openModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    async confirmLogout() {
      this.closeModal();
      await this.$emit('handleLogout');
    }
  }
}
</script>

<template>
  <div class="modal" v-if="show" @click.self="closeModal">
    <div class="modal-content" style="width: 21%; border-style: solid">
      <h5>Are you sure you want to log out ?</h5>
      <div class="buttons">
        <button class="btn btn-danger" @click="confirmLogout">Yes, Log out</button>
        <button class="btn btn-primary" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
  <!--  @click.self="closeModal": click ngoài modal modal sẽ close-->
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>