<template>
  <div class="container">
    <br />
    <div>
      <b-card no-body>
        <b-card
          bg-variant="primary"
          text-variant="white"
          body-bg-variant="secondary"
          header="Table User List"
          class="text-center"
        >
          <b-card no-body text-variant="dark">
            <vue-bootstrap4-table
              :rows="dataOfUser"
              :columns="columns"
              :config="configTable"
              :actions="actions"
              @on-add-course="onAddCourse"
            >
              <template slot="namecourse" slot-scope="props">
                <i>{{props.cell_value}}</i>
              </template>
              <template slot="institution" slot-scope="props">
                <i>{{props.cell_value}}</i>
              </template>
              <template slot="ownercourse" slot-scope="props">
                <i>{{props.cell_value}}</i>
              </template>
              <template slot="detail" slot-scope="props">
                <b-button
                  variant="outline-info"
                  block
                  v-on:click="showFromCourseCompletion(props)"
                >Detail</b-button>
              </template>
              <template slot="update" slot-scope="props">
                <b-button variant="outline-primary" block v-on:click="updateSelected(props)">Update</b-button>
              </template>
              <template slot="delete" slot-scope="props">
                <b-button
                  variant="outline-danger"
                  block
                  v-on:click="showConfirmDelete(props)"
                >Delete</b-button>
              </template>
            </vue-bootstrap4-table>
          </b-card>
        </b-card>
        <b-card
          v-if="showTesting"
          bg-variant="dark"
          text-variant="white"
          body-bg-variant="secondary"
          header="Test Function"
          class="text-center"
        >
          <b-row>
            <b-col lg="4" class="pb-2">
              <b-button class="mt-2" variant="light" block v-on:click="courseGetDetail">Get Course</b-button>
            </b-col>
            <b-col lg="4" class="pb-2">
              <b-button
                class="mt-2"
                variant="warning"
                block
                v-on:click="getCourseOfUser"
              >GetUserIdAuth</b-button>
            </b-col>
            <b-col lg="4" class="pb-2">
              <b-button class="mt-2" variant="light" block v-on:click="postAllCourse">postAllCourse</b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4" class="pb-2">
              <b-button class="mt-2" variant="light" block>postAllCourse</b-button>
            </b-col>
          </b-row>
          <b-col lg="4" class="pb-2">
            <b-button class="mt-2" variant="light" block>test Modal</b-button>
          </b-col>
        </b-card>
      </b-card>
    </div>
    <div>
      <b-modal
        ref="add-course-modal"
        hide-footer
        title="Broker Add Course"
        size="lg"
        :header-bg-variant="color_success"
        :header-text-variant="color_light"
        :body-bg-variant="color_light"
        :body-text-variant="color_dark"
      >
        <div>
          <b-container>
            <b-row>
              <b-col sm="2">
                <label for="input-course-name">Course Name:</label>
              </b-col>
              <b-col sm="10">
                <b-form-textarea
                  placeholder="Enter your name "
                  rows="3"
                  max-rows="8"
                  v-model="dataForPush.coursename"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Server :</label>
              </b-col>
              <b-col sm="10">
                <b-form-select
                  v-model="dataForPush.servername"
                  :options="optionsServer"
                  class="mb-3"
                  value-field="platform"
                  text-field="name"
                  disabled-field="notEnabled"
                ></b-form-select>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Course Id :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter your Course id" v-model="dataForPush.courseid"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Institute :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter institution" v-model="dataForPush.institution"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Link :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter your Link Course" v-model="dataForPush.serverlink"></b-form-input>
              </b-col>
            </b-row>
            <br />
          </b-container>
        </div>
        <b-button
          class="mt-2"
          variant="success"
          text-variant="light"
          :pressed="true"
          block
          v-on:click="addCourse"
        >Add Course</b-button>
      </b-modal>
      <b-modal
        ref="delete-course-modal"
        hide-footer
        title="Comfirm to Delete"
        size="lg"
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
              <h5>{{seletedDataForDelete.coursename}}</h5>
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
        <b-button class="mt-3" variant="danger" :pressed="true" block v-on:click="deleteSelected">Confirm Delete</b-button>
        <b-button class="mt-3" variant="warning" :pressed="true" block v-on:click="hideDeleteModal">Cancel</b-button>
      </b-modal>
      <b-modal
        ref="course-completion-modal"
        hide-footer
        title="Get Course Completion"
        size="lg"
        :header-bg-variant="color_info"
        :header-text-variant="color_light"
        :body-bg-variant="color_light"
        :body-text-variant="color_dark"
      >
        <div class="d-block text-center">
          <b-row>
            <b-col sm="3">
              <h5>Course Id</h5>
            </b-col>
            <b-col sm="8">
              <h5>{{seletedDataForGetCourseCompletion._id}}</h5>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="3">
              <h5>Course Name</h5>
            </b-col>
            <b-col sm="8">
              <h5>{{seletedDataForGetCourseCompletion.coursename}}</h5>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="3">
              <h5>TCU username</h5>
            </b-col>
            <b-col sm="8">
              <b-form-input placeholder="Enter your User ID" v-model="inputTCUUsername"></b-form-input>
            </b-col>
          </b-row>
        </div>
        <b-button
          class="mt-3"
          variant="primary"
          :pressed="true"
          block
          v-on:click="getCourseCompletion()"
        >Get Course Completion</b-button>
      </b-modal>
      <b-modal ref="course-completion-detail-modal" hide-footer title="Course Completion">
        <div class="d-block text-left">
          <br />
          <b-row>
            <b-col sm="3">
              <h5>user id</h5>
            </b-col>
            <b-col sm="6">
              <h5>{{dataFromAPI.userid}}</h5>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="3">
              <h5>Status</h5>
            </b-col>
            <b-col sm="6">
              <h5>{{dataFromAPI.status}}</h5>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="3">
              <h5>Link</h5>
            </b-col>
            <b-col sm="6">
              <b-link href="#">{{dataFromAPI.url}}</b-link>
              <!-- <h5>{{dataFromAPI.url}}</h5> -->
            </b-col>
          </b-row>
        </div>
      </b-modal>
      <b-modal
        ref="edit-course-modal"
        hide-footer
        title="Broker Edit Course"
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
                <label for="input-course-name">Course Name:</label>
              </b-col>
              <b-col sm="10">
                <b-form-textarea
                  placeholder="Enter your name "
                  rows="3"
                  max-rows="8"
                  v-model="seletedDataForEdit.coursename"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>institution :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  placeholder="Enter your Institution"
                  v-model="seletedDataForEdit.institution"
                ></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Server :</label>
              </b-col>
              <b-col sm="10">
                <b-form-select
                  v-model="seletedDataForEdit.servername"
                  :options="optionsServer"
                  class="mb-3"
                  value-field="platform"
                  text-field="name"
                  disabled-field="notEnabled"
                ></b-form-select>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Course Id :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter your Owner" v-model="seletedDataForEdit.courseid"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col sm="2">
                <label>Link :</label>
              </b-col>
              <b-col sm="10">
                <b-form-input placeholder="Enter your Link" v-model="seletedDataForEdit.serverlink"></b-form-input>
              </b-col>
            </b-row>
            <br />
          </b-container>
        </div>
        <div>
          <b-row>
            <b-col>
              <b-button
                class="mt-5"
                variant="primary"
                :pressed="true"
                block
                v-on:click="updateCourse"
              >Update Course</b-button>
            </b-col>
            <b-col>
              <b-button
                class="mt-5"
                variant="danger"
                :pressed="true"
                block
                v-on:click="cancelAddCourse"
              >Cancel</b-button>
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </div>
    <!-- <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config"></vue-bootstrap4-table> -->
  </div>
</template>

<script>
import UserService from "../services/user.service";
import CourseService from "../services/course.service";
import ServerService from "../services/server.service";
import GetCourseCompletionService from "../services/getCompletion.service";
import VueBootstrap4Table from "vue-bootstrap4-table";
import qs from "qs";

export default {
  name: "Admin",
  components: {
    VueBootstrap4Table,
  },
  data() {
    return {
      variants: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark",
      ],

      showTesting: false,
      userAuth: null,
      dataForPush: {
        coursename: "",
        courseid: "",
        ownercourse: "",
        institution: "",
      },
      seletedDataForDelete: [],
      seletedDataForEdit: [],
      seletedDataForGetCourseCompletion: [],
      content: "",
      headerBgVariant: "success",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "secondary",
      footerTextVariant: "light",
      color_primary: "primary",
      color_success: "success",
      color_light: "light",
      color_dark: "dark",
      color_secondary: "secondary",
      color_danger: "danger",
      color_info : "info",
      dataOfUser: [],
      dataFromAPI: [],

      columns: [
        {
          label: "ชื่อวิชา",
          name: "coursename", // access nested objects properties with "."
        },
        {
          label: "หน่วยงาน",
          name: "institution", // access nested objects properties with "."
        },
        {
          label: "สถานะ",
          name: "detail.status",
        },
        {
          label: "รายละเอียด",
          name: "detail",
        },
        {
          label: "แก้ไข",
          name: "update",
        },
        {
          label: "ลบ",
          name: "delete",
        },
      ],
      actions: [
        {
          btn_text: "AddCourse",
          event_name: "on-add-course",
          class: "btn btn-outline-success pill my-custom-class",
        },
      ],
      configTable: {
        card_mode: false,
        selected_rows_info: false,
        pagination: false,
        pagination_info: false,
        checkbox_rows: true,
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
      optionsServer: [],
      isHaveData: false,
      inputTCUUsername: "",
    };
  },
  watch: {},
  methods: {
    showFromCourseCompletion(props) {
      this.seletedDataForGetCourseCompletion = props.row;
      this.$refs["course-completion-modal"].show();
    },
    hideDeleteModal() {
      this.$refs["delete-course-modal"].hide();
    },
    async onAddCourse() {
      // get server list to optionsServer
      let dataForOptions = await ServerService.getOwnerServer(this.currentUser);
      this.optionsServer = dataForOptions;
      this.$refs["add-course-modal"].show();
    },
    updateSelected(props) {
      this.seletedDataForEdit = props.row;
      this.seletedDataForEdit.servername = props.row.server.name;
      this.seletedDataForEdit.serverlink = props.row.server.link;
      this.$refs["edit-course-modal"].show();
    },
    cancelAddCourse() {
      this.$refs["add-course-modal"].hide();
    },
    showConfirmDelete(props) {
      this.seletedDataForDelete = props.row;
      this.$refs["delete-course-modal"].show();
    },
    async getCourseCompletion() {
      try {
        let temp = await GetCourseCompletionService.getCourseCompletion(
          this.seletedDataForGetCourseCompletion._id,
          this.inputTCUUsername
        );
        this.dataFromAPI = temp;
        this.$refs["course-completion-detail-modal"].show();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteSelected() {
      await CourseService.deleteCourseById(this.seletedDataForDelete._id);
      await this.getCourseOfUser();
      this.hideDeleteModal();
    },
    AddCourseModalShow() {
      this.$refs["add-course-modal"].show();
    },
    async AddCourseModalHide() {
      this.$refs["add-course-modal"].hide();
    },
    async courseGetDetail() {
      let tempOwnerCourse = {
        ownercourse: "0",
      };
      let data = await CourseService.getOwnerCourse(
        qs.stringify(tempOwnerCourse)
      );
    },
    async postAllCourse() {
      let tempOwnerCourse = {
        ownercourse: "artronin",
      };
      let data = await CourseService.getOwnerCourse(
        qs.stringify(tempOwnerCourse)
      );
    },
    async addCourse() {
      this.dataForPush.ownercourse = this.$store.state.auth.user.username;
      await CourseService.addCourse(qs.stringify(this.dataForPush));
      await this.getCourseOfUser();
      this.$refs["add-course-modal"].hide();
    },
    async updateCourse() {
      this.seletedDataForEdit.ownercourse = this.$store.state.auth.user.username;
      await CourseService.updateCourse(qs.stringify(this.seletedDataForEdit));
      await this.getCourseOfUser();
      // this.dataForPush = []
      this.$refs["edit-course-modal"].hide();
    },
    async getCourseOfUser() {
      var resData = await CourseService.getOwnerCourse(this.currentUser);
      this.dataOfUser = resData;
      this.isHaveData = true;
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  async mounted() {
    await this.getCourseOfUser();

    await UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>