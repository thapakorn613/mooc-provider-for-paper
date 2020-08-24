<template>
  <div class="container">
    <br />
    <div>
      <b-card no-body>
        <b-card
          bg-variant="info"
          text-variant="white"
          body-bg-variant="secondary"
          header="Profile Data"
          class="text-left"
        >
          <p>
            <strong>Token :</strong>
            {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}} ///
            {{currentUser.accessToken}}
          </p>
          <p>
            <strong>Id:</strong>
            {{currentUser.id}}
          </p>
          <p>
            <strong>Email:</strong>
            {{currentUser.email}}
          </p>
          <strong>Authorities:</strong>
          <ul>
            <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
          </ul>
        </b-card>
        <b-card
          bg-variant="primary"
          text-variant="white"
          body-bg-variant="secondary"
          header="Configuration Data"
          class="text-left"
        >
          <b-card no-body text-variant="dark">
            <vue-bootstrap4-table
              :rows="dataOfServer"
              :columns="columns"
              :config="configTable"
              :actions="buttonServerActions"
              @on-add-server="onAddServer"
            >
              <template slot="name" slot-scope="props">
                <i>{{props.cell_value}}</i>
              </template>
              <template slot="institute" slot-scope="props">
                <i>{{props.cell_value}}</i>
              </template>
              <template slot="platform" slot-scope="props">
                <i>{{props.cell_value}}</i>
              </template>
              <template slot="edit" slot-scope="props">
                <b-button
                  variant="info"
                  text-variant="light"
                  :pressed="true"
                  block
                  v-on:click="showFromEditServer(props.row)"
                >Edit</b-button>
              </template>
            </vue-bootstrap4-table>
          </b-card>
          <b-card no-body text-variant="dark"></b-card>
        </b-card>
      </b-card>
    </div>
    <div>
      <b-modal
        ref="add-server-modal"
        hide-footer
        title="Broker Add Server"
        size="lg"
        :header-bg-variant="color_success"
        :header-text-variant="color_light"
        :body-bg-variant="color_light"
        :body-text-variant="color_dark"
      >
        <div>
          <b-container>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Name Server:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter your Name server" v-model="dataForAddServer.name"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Institute:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter institution" v-model="dataForAddServer.institute"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Platform :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter Platform" v-model="dataForAddServer.platform"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Link :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter your Link Course" v-model="dataForAddServer.link"></b-form-input>
              </b-col>
            </b-row>
            <br />
          </b-container>
        </div>
        <b-button
          class="mt-2"
          text-variant="light"
          :pressed="true"
          variant="success"
          block
          v-on:click="addServer"
        >Add Server</b-button>
      </b-modal>
      <b-modal
        ref="edit-server-modal"
        hide-footer
        title="Broker Edit Server"
        size="lg"
        :header-bg-variant="color_primary"
        :header-text-variant="color_light"
        :body-bg-variant="color_light"
        :body-text-variant="color_dark"
      >
        <div>
          <b-container>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Name Server:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter your Name server" v-model="dataForEditServer.name"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Institute:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter institution" v-model="dataForEditServer.institute"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Platform :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter Platform" v-model="dataForEditServer.platform"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Link :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter your Link Course" v-model="dataForEditServer.link"></b-form-input>
              </b-col>
            </b-row>
            <br />
          </b-container>
        </div>
        <b-button
          class="mt-2"
          variant="primary"
          text-variant="light"
          :pressed="true"
          block
          v-on:click="editServer"
        >Update Server</b-button>
        <b-button
          class="mt-2"
          variant="danger"
          text-variant="light"
          :pressed="true"
          block
          v-on:click="showConfirmToDeleteServer"
        >Delete Server</b-button>
      </b-modal>
      <b-modal
        ref="delete-server-modal"
        hide-footer
        title="Comfirm to Delete"
        :header-bg-variant="color_danger"
        :header-text-variant="color_light"
        :body-bg-variant="color_light"
        :body-text-variant="color_dark"
      >
        <div class="d-block text-center">
          <b-row>
            <b-col sm="2">
              <h5>namecourse</h5>
            </b-col>
            <b-col sm="10">
              <h5>{{seletedDataForDelete.name}}</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="2">
              <h5>course id</h5>
            </b-col>
            <b-col sm="10">
              <h5>{{seletedDataForDelete._id}}</h5>
            </b-col>
          </b-row>
        </div>
        <b-button
          class="mt-3"
          variant="danger"
          :pressed="true"
          block
          v-on:click="deleteSelected"
        >Confirm Delete</b-button>
        <b-button class="mt-3" variant="warning" block v-on:click="hideDeleteModal">Cancel</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import VueBootstrap4Table from "vue-bootstrap4-table";
import ServerService from "../services/server.service";
import qs from "qs";

export default {
  name: "Profile",
  components: {
    VueBootstrap4Table,
  },
  data() {
    return {
      dataOfServer: [],
      dataForAddServer: [],
      dataForEditServer: [],
      seletedDataForDelete: [],
      columns: [
        {
          label: "name",
          name: "name", // access nested objects properties with "."
        },
        {
          label: "หน่วยงาน",
          name: "institute", // access nested objects properties with "."
        },
        {
          label: "ผุ้ดูแล",
          name: "platform",
        },
        {
          label: "แก้ไข",
          name: "edit",
        },
      ],
      bodyBgVariant: "light",
      configTable: {
        card_mode: false,
        selected_rows_info: false,
        pagination: false,
        pagination_info: false,
        checkbox_rows: false,
        highlight_row_hover: true,
        rows_selectable: true,
        highlight_row_hover_color: "#C0C0C0",
        card_title: "Vue Bootsrap 4 advanced table",
        global_search: {
          placeholder: "Enter custom Search text",
          visibility: false,
          case_sensitive: false,
        },
        show_refresh_button: false,
        show_reset_button: false,
        server_mode: true,
        preservePageOnDataChange: true,
      },
      buttonServerActions: [
        {
          btn_text: "Add Server",
          event_name: "on-add-server",
          class: "btn btn-outline-success pill my-custom-class",
        },
      ],
      color_primary: "primary",
      color_success: "success",
      color_light: "light",
      color_dark: "dark",
      color_secondary: "secondary",
      color_danger: "danger",
      color_info: "info",
    };
  },
  methods: {
    showFromEditServer(dataProp) {
      this.dataForEditServer = dataProp;
      this.$refs["edit-server-modal"].show();
    },
    showConfirmToDeleteServer() {
      this.seletedDataForDelete = this.dataForEditServer;
      this.$refs["delete-server-modal"].show();
    },
    async deleteSelected() {
      var data = qs.stringify({
        id: this.seletedDataForDelete._id,
      });
      await ServerService.deleteServer(data);
      this.hideDeleteModal();
      this.hideEditModal();
    },

    async addServer() {
      this.dataForAddServer.ownerpass = this.$store.state.auth.user.username;
      await ServerService.addServer(qs.stringify(this.dataForAddServer));
      await this.getOwnerServer();
      this.$refs["add-server-modal"].hide();
    },
    async editServer() {
      this.dataForEditServer.ownerpass = this.$store.state.auth.user.username;
      await ServerService.updateServer(qs.stringify(this.dataForEditServer));
      await this.getOwnerServer();
      this.$refs["edit-server-modal"].hide();
    },
    async getOwnerServer() {
      let resData = await ServerService.getOwnerServer(this.currentUser);
      this.dataOfServer = resData;
      this.isHaveData = true;
    },
    onAddServer() {
      this.$refs["add-server-modal"].show();
    },
    async hideAddModal() {
      await this.getOwnerServer();
      this.$refs["add-server-modal"].hide();
    },
    async hideDeleteModal() {
      await this.getOwnerServer();
      this.$refs["delete-server-modal"].hide();

    },
    async hideEditModal() {
      await this.getOwnerServer();
      this.$refs["edit-server-modal"].hide();
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  async mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    await this.getOwnerServer();
  },
};
</script>