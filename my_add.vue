<template>
  <div class="email_task">
    <!-- 导航 -->

    <div class="navigation_bar">
      <div class="back" @click="handle_back_Home">
        <img src="../../assets/icon_arrow1.png" alt="" class="icon_arrow" />
        <span>返回</span> <span class="segmentation"></span>
      </div>
      <div class="record_teacher">{{ getRouteName() }}</div>
    </div>
    <div class="task_div">
      <!-- 标题 -->
      <div class="title_div">
        <div class="title_div_div" style="margin-left: 15px;">
          <img src="../../assets/Layout/know/title.png" />
          <span class="title_div_div_text" style="margin-left: 15px;">{{ product_Store.products.find(item => item.act
            === 1)?.productName }}</span>
        </div>
      </div>
      <!--新建任务 -->
      <div class="task_div_form">
        <el-form label-position="top" class="form_task" ref="formRef" :rules="rules" :model="taskStore.taskMes">
          <el-form-item label="任务名称:" prop="issueInput">
            <div class="div_input_name">
              <input_0 v-model:valInput="taskStore.taskMes.issueInput" @input="handleIssueInput"
                placeholder="请输入任务名称" />
            </div>
          </el-form-item>
          <el-form-item label="是否公开:" :required="true" prop="isPublic">
            <!-- <el-input class="name_task" placeholder="请输入班级名称"/> -->
            <div style="display: flex">
              <bt_0 name="是" @click="handlePublic" :act="taskStore.taskMes.isPublic" :key="publicKey" />
              <bt_0_1 name="否" @click="handleRePublic" :act="!taskStore.taskMes.isPublic" :key="publicKey" />
            </div>
          </el-form-item>
          <el-form-item label="任务内容:" :required="true" style="margin-bottom: 0px;">
            <!-- 理论阅读 -->
            <el-form-item>
              <div class="rd_div">
                <div class="rd_div_title">理论阅读</div>
                <div style="display: flex; flex-wrap: wrap;padding-left: 37px">
                  <tag_0 class="tag_task" v-for="(item, index) in taskStore.taskMes.knows" :name="item.name" type="理论阅读"
                    :index="index" :key="index" @handleClose="handleClose_tag_0" />
                </div>

                <div>
                  <span class="rd_div_tip text_0">添加理论阅读</span>

                  <span class="rd_div_add" @click="handleKnowAdd">
                    <img src="../../assets/Layout/task/up_task.png" class="up_task_img" />知识库</span>

                  <span class="rd_div_add" @click="handleUpOpen"><img src="../../assets/Layout/task/up_task.png"
                      class="up_task_img" />本地上传</span>
                </div>
              </div>
            </el-form-item>
            <!-- 理论测试 -->
            <el-form-item prop="tests">
              <div class="rd_div tests_back">
                <div class="rd_div_title">理论测试</div>
                <div class="tests_div" v-for="(item, index) in taskStore.taskMes.tests" :key="index">
                  <span class="span_input1">
                    <tag_0_t class="tag_task" :name="item.name" type="理论测试" :index="index"
                      @handle-close="handleClose_tag_0_test" />
                  </span>
                  <span style="display: inline-block; width: 255px; height: 53px">
                    <input_0 v-model:valInput="taskStore.taskMes.tests[index].scoreRe" placeholder="请输入达标分值"
                      inputType="number" @input="handleTestScoreInput(item, $event)" />
                  </span>
                  <span class="text_2" style="margin-left: 14px">
                    试卷分值：{{ item.score }}分；考试时长：{{ Math.ceil((item.times / 60)) }}分钟
                  </span>
                </div>
                <div>
                  <span class="rd_div_tip">添加理论测试</span>
                  <span class="rd_div_add" @click="handleTestAdd()"><img src="../../assets/Layout/task/up_task.png"
                      class="up_task_img" />理论测试中心</span>
                  <span class="rd_div_add" @click="handleDownOpen()"><img src="../../assets/Layout/task/up_task.png"
                      class="up_task_img" />本地上传</span>
                </div>
              </div>
            </el-form-item>
            <!-- 实操训练 -->
            <el-form-item prop="trains" style="margin-bottom: 30px;">
              <div class="rd_div trains_back">
                <div class="rd_div_title">
                  实操训练
                  <span class="text_2" style="margin-inline: 14px">
                    满分分值：100分
                  </span>
                </div>
                <div>
                  <span class="text_0">{{ eqName }}</span>
                </div>
                <div v-for="(styleItem, styleIndex) in getStyle" style="margin-left: 30px;">
                  <!-- <div>{{ styleItem }}</div> -->
                  <div v-for="(moduleItem, moduleIndex) in getModule(styleItem)" :key="index">
                    <span class="text_1"><img src="../../assets/Layout/task/tip1_train.png" class="up_task_img" />{{
                      moduleItem }}</span>
                    <div v-for="(itemSub, indexSub) in getTrain(styleItem, moduleItem)" :key="indexSub"
                      style="display: flex;">
                      <span>
                        <tag_0 class="tag_train" :name="itemSub.name" type="实操训练" :index="indexSub"
                          @handle-close="handleClose_tag_0_train(itemSub)" />
                      </span>
                      <el-form-item>
                        <span class="train_input" style="display: inline-block;width:255px;height:53px">
                          <input_0 placeholder="请输入达标分值" v-model:valInput="itemSub.score"
                            @input="handleScoreInput(itemSub, $event)" @blur="hanleScoreBlur()" />
                        </span>
                      </el-form-item>
                      <el-form-item>
                        <span class="train_input" style="display: inline-block;width:255px;height:53px">
                          <input_0 placeholder="请输入达标次数" v-model:valInput="itemSub.times"
                            @input="handleTimesInput(itemSub, $event)" @blur="hanleTimesBlur()" />
                        </span>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="rd_div_tip">添加实操训练</span>
                  <span class="rd_div_add" @click="handleModuleOpen"><img src="../../assets/Layout/task/up_task.png"
                      class="up_task_img" />选择训练模块</span>
                </div>
              </div>
            </el-form-item>
          </el-form-item>
          <div v-if="isErrorOnTasks()" class="form-error">请输入任务内容</div>
          <!-- <el-form-item label="任务周期" :required="true">
          <input_1
            width="180px"
            height="53px"
            placeholder="请输入任务天数"
            v-model:valInput="cycle"
            @input="handleDaysInput"
          />
        </el-form-item> -->
          <el-form-item label="发放对象" v-if="route.query.key == 'emit'" prop="objectSelectItem">
            <div class="obj_task">
              <tag_1 type="期数" :name="item.ClassName" :index="1" v-for="(item, index) in objectsSelect" :key="index"
                @handleClose="handleObjectClose(item)" />
              <div style="width: 145px; height: 53px">
                <select_prefix placeholder="添加发放对象" v-model:valSelect="objectSelectItem" :options="emitObjects"
                  :key="objectKey" @change="handleObjectChange" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="任务周期">
            <div style="display: flex;gap: 50px;">
              <el-form-item prop="cycle">
                <div class="div_input_cycleInput" style="display: flex;">
                  <input_0 placeholder="请输入任务天数" v-model:valInput="taskStore.taskMes.cycle" @input="handleDaysInput"
                    inputType="number" />
                  <div style="display: flex;align-items: center;"><span class="font14_7_400"
                      style="margin-left: 10px;">天</span>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item prop="isRelax">
                <div style="width: 281px; height: 53px" v-if="route.query.key == 'emit'">
                  <select_3 placeholder="是否去除节假日" v-model:valSelect="taskStore.taskMes.isRelax" :options="relaxOpts"
                    @change="handleIncluedChange" />
                </div>
              </el-form-item> -->
              <el-form-item prop="startDate">
                <div style="width: 281px; height: 53px" v-if="route.query.key == 'emit'">
                  <!-- <el-date-picker prefix-icon="none" v-model="taskStore.taskMes.startDate" type="date"
                    :key="startDateKey" placeholder="请选择任务开始时间" :size="size" class="date_div"
                    @change="handleStartDateChange"
                    :disabled-date="taskStore.taskMes.isRelax == 0 ? disabledStartDate : () => false" /> -->
                  <el-date-picker prefix-icon="none" v-model="taskStore.taskMes.startDate" type="date"
                    :key="startDateKey" placeholder="请选择任务开始时间" :size="size" class="date_div"
                    @change="handleStartDateChange" :disabled-date="disabledStartDateed" />
                </div>
              </el-form-item>
              <el-form-item prop="endDate">
                <div style="width: 281px; height: 53px" v-if="route.query.key == 'emit'">
                  <el-date-picker prefix-icon="none" v-model="taskStore.taskMes.endDate" type="date" :key="endDateKey"
                    placeholder="请选择任务结束时间" :size="size" class="date_div" @change="handleEndDateChange"
                    :disabled-date="taskStore.taskMes.isRelax == 0 ? disabledEndDate : () => false" />
                </div>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="任务说明" v-if="route.query.key == 'emit'">
            <div class="textarea0" style="width: 1043px; height: 200px">
              <textarea_3 v-model:context="context" placeholder="请输入任务说明" @input="handleContextInput" />
            </div>
          </el-form-item>
          <el-form-item>
            <div style="display: flex">
              <bt_1 :name="getSubmitName()" @click="handleSubmit()" />
              <bt_1 class="cancel_task" name="取消" @click="handleCancel()" style="margin-left: 25px" />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 理论阅读 - 本地上传 -->
    <fileUpload v-if="uploadOpen" @getValue="handleUpClose" :isTask="1" @click="handleReadSubmit" />
    <!-- 理论测试 - 本地上传 -->
    <model_down v-if="downOpen" @getValue="handleDownClose" />
    <!-- 实操训练 - 选择模块 -->
    <trainModule v-if="moduleOpen" @handleClose="handleClose_module" @handleSubmit="handleSubmit_module" />
    <diag_emit @as_submit="handleSubmitEmit" @as_close="handleCloseEmit" @as_cancel="handleCancelEmit" v-if="isEmitDiag"
      title="删除任务" context_0="删除后不可恢复，确定删除该任务" context_1="" button_0="确定删除" button_1="取消" />
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, nextTick } from "vue";
import input_0 from "../../components/input_0.vue";
import input_1 from "../../components/input_1.vue";
import tag_0 from "../../components/tag_0.vue";
import tag_0_t from "../../components/tag_0_t.vue";

import bt_0 from "../../components/button_0.vue";
import bt_0_1 from "../../components/button_0_1.vue";
import bt_1 from "../../components/button_4.vue";
import fileUpload from "../knowledge/components/fileUpload.vue";
import model_down from "./components/model_down.vue";
import trainModule from "./components/trainModule.vue";
import textarea_3 from "../../components/textarea_3.vue";
import select_prefix from "../../components/select_prefix.vue";
import diag_emit from "../../components/diag_emit.vue";
import { useKnowStore } from "../../store/know.js";
import select_3 from "../../components/select_3.vue";
import tag_1 from "../../components/tag_1.vue";
import { useRoute, useRouter } from "vue-router";
import { TaskList_Insert2, TaskList_Update2, TaskEmit_Insert } from "../../api/assignment/assignment.js";
import { formatTimestamp } from "../../utils/dataLoader.js";

import { useTaskStore } from "../../store/task.ts";
import { queryOrgClasses, GetClassListByTea } from "../../api/classandgrade/classandgrade";
import { ElMessage } from "element-plus";
import { holidays } from "../../config/holidays";
import { productStore } from "../../store/product";
import { trainStore } from "../../store/train";
import { GetModulesByCase } from "../../api/product/product";

const classEndDate = ref(null);
const product_Store = productStore();
const startDateKey = ref(0);
const endDateKey = ref(0);
const taskStore = useTaskStore();
const knowStore = useKnowStore();
const route = useRoute();
const router = useRouter();
const handle_back_Home = () => {
  knowStore.contextList = [];
  knowStore.knowIdList = [];
  knowStore.knowNameList = [];
  //taskStore.routerPage = "task_center";
  router.back();
};

const isBtActive = ref(false);
const objectSelectItem = ref(null);
const objectKey = ref(0);
const formRef = ref(null);
/******************************************校验规则 */
const rules = reactive({
  issueInput: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (
          taskStore.taskMes.issueInput == null ||
          taskStore.taskMes.issueInput == ""
        ) {
          callback(new Error("请输入任务名称"));
        } else if (taskStore.taskMes.issueInput.length > 20) {
          callback(new Error("任务名称不能超过20字"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  isPublic: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (taskStore.taskMes.isPublic == null || (taskStore.taskMes.isPublic != 1 && taskStore.taskMes.isPublic != 0)) {
          callback(new Error("请输入是否公开"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  cycle: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (taskStore.taskMes.cycle == null || taskStore.taskMes.cycle == "") {
          callback(new Error("请输入任务天数"));
        } else {
          if (taskStore.taskMes.cycle < 1) {
            callback(new Error("任务天数必须大于等于1"));
          } else {
            callback();
          }
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
  isRelax: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (route.query.key == "emit" && taskStore.taskMes.isRelax == null) {
          callback(new Error("请输入是否去除节假日"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  startDate: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (route.query.key == "emit" && (taskStore.taskMes.startDate == null || taskStore.taskMes.startDate == "")) {
          callback(new Error("请输入开始时间"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  endDate: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (route.query.key == "emit" && (taskStore.taskMes.endDate == null || taskStore.taskMes.endDate == "")) {
          callback(new Error("请输入结束时间"));
        } else {
          if (classEndDate.value != null) {
            //如果taskStore.taskMes.endDate不是Date类型，则进行转化
            if (typeof taskStore.taskMes.endDate == "string") {
              taskStore.taskMes.endDate = new Date(taskStore.taskMes.endDate);
            }
            classEndDate.value.setHours(0, 0, 0, 0);
            taskStore.taskMes.endDate.setHours(0, 0, 0, 0);
            if (classEndDate.value.getTime() <= taskStore.taskMes.endDate.getTime())
              callback(new Error("任务已超出课程时间，请重新设置"));
            else
              callback();
          } else {
            callback();
          }
        }
      },
      trigger: "blur",
    },
  ],
  objectSelectItem: [
    {
      validator: (rule, value, callback) => {
        if (route.query.key == "emit" && (objectsSelect.value == null || objectsSelect.value.length == 0)) {
          callback(new Error("请选择发放对象"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  tests: [
    {
      validator: (rule, value, callback) => {
        if (
          taskStore.taskMes.tests.some(item => item.scoreRe == null || item.scoreRe == "")
        ) {
          callback(new Error("请添加达标分值"));
        } else {
          if (taskStore.taskMes.tests.some(item => item.scoreRe > 100)) {
            callback(new Error("达标分值不能超过100"));
          } else {
            callback();
          }

        }
      },
      trigger: "blur",
    },
  ],
  trains: [
    {
      validator: (rule, value, callback) => {
        if (
          taskStore.taskMes.trains.some(item => item.score == null || item.score == "")
        ) {
          callback(new Error("请输入达标分值"));
        } else {
          if (taskStore.taskMes.trains.some(item => item.times == null || item.times == "")) {
            callback(new Error("请输入达标次数"));
          } else {
            if (taskStore.taskMes.trains.some(item => item.score > 100)) {
              callback(new Error("达标分值不能超过100"));
            } else {
              if (taskStore.taskMes.trains.some(item => item.score < 1)) {
                callback(new Error("达标分值不能小于1"));
              } else {
                if (taskStore.taskMes.trains.some(item => item.times < 1)) {
                  callback(new Error("达标次数不能小于1"));
                } else {
                  callback();
                }
              }
            }
          }
        }
      },
      trigger: "blur",
    },
  ],
});
const hanleScoreBlur = async () => {
  formRef.value.validateField("trains");
}
const hanleTimesBlur = async () => {
  formRef.value.validateField("trains");
}

const disabledStartDateed = (date) => {
  const today = new Date(); // 获取今天的日期
  today.setHours(0, 0, 0, 0); // 清除时间部分，确保是当天的 00:00
  return date < today; // 禁用今天之前的日期
}

const disabledStartDate = computed(() => {
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  return (date) => {
    return holidays.map(item => new Date(item.date).toDateString()).includes(date.toDateString());
  };
});
const disabledEndDate = computed(() => {
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  return (date) => {
    return holidays.map(item => new Date(item.date).toDateString()).includes(date.toDateString());
  };
});
//tag标签

/********************************************删除发放对象 */
const handleObjectClose = (item) => {
  objectsSelect.value = objectsSelect.value.filter((subItem) => subItem.ClassName != item.ClassName);
  emitObjects.value.push({ label: item.ClassName, value: item.ClassName, id: item.ClassId });
}

/****************************************组件输入数据 */
//任务名称
const issueInput = ref();
const handleIssueInput = (e) => {
  issueInput.value = e;
  ruleForm.issueInput = e;
};
//是否公开
const publicKey = ref(1);
const isPublic = ref(1);
const handlePublic = (act) => {
  //isPublic.value = act;
  taskStore.taskMes.isPublic = act;
  publicKey.value++;
  formRef.value.validateField("isPublic");
};
const handleRePublic = (act) => {
  taskStore.taskMes.isPublic = act == 1 ? 0 : 1;
  publicKey.value++;
  formRef.value.validateField("isPublic");
};
const passScore = ref(null);
const handleTestScoreInput = (item, e) => {
  //passScore.va = e.replace(/\D/g, "");
};
//********************************************************************理论阅读

//初始数据
const readding = ref([]);
//删除
const handleClose_tag_0 = (e) => {
  // if (typeof e == "number") {
  //   readding.value = readding.value.filter((item, index) => index != e);
  // }
  if (typeof e == "number") {
    taskStore.taskMes.knows = taskStore.taskMes.knows.filter(
      (item, index) => index != e
    );
  }
};
//理论阅读 - 本地上传
const uploadOpen = ref(false);
const handleUpOpen = () => {
  uploadOpen.value = true;
  //测试接口,上传成功
  //readding.value.push("护理查询基本流程2");
};
const handleUpClose = () => {
  uploadOpen.value = false;
};
const handleReadSubmit = (reads) => {
  if (reads != null && reads.length > 0) {
    reads.forEach((item) => {
      taskStore.taskMes.knows.push({ id: item.id, name: item.name });
      readding.value.push({ id: item.id, name: item.name });
      ruleForm.reads.push({ id: item.id, name: item.name });
    });
  }
  uploadOpen.value = false;
};

//***************************************************************理论测试
const testting = ref(["理论测试0", "理论测试1", "理论测试2"]);

//删除
const handleClose_tag_0_test = (e) => {
  if (typeof e == "number") {
    taskStore.taskMes.tests = taskStore.taskMes.tests.filter((item, index) => index != e);
  }
};
//添加测试
const handleTestAdd = () => {
  if (route.query.key == "add") {
    router.replace({ path: "/assignment/test_add", query: { key: "add" } });
  }
  if (route.query.key == "edit") {
    router.replace({ path: "/assignment/test_add", query: { key: "edit" } });
  }
  if (route.query.key == "emit") {
    router.replace({ path: "/assignment/test_add", query: { key: "emit" } });
  }
};
//理论测试 - 本地上传
const downOpen = ref(false);
const handleDownOpen = () => {
  downOpen.value = true;

  //测试接口
  testting.value.push("理论测试3");
};
const handleDownClose = () => {
  downOpen.value = false;
};

//***********
const train = ref([]);
/********************************************* 实操训练*/
const getStyle = computed(() => {
  return [...new Set(taskStore.taskMes.trains.map(item => item.style))];
})
const getModule = (style) => {
  return [...new Set(taskStore.taskMes.trains.filter(item => item.style == style).map(item => item.moduleName))];
}
const getTrain = (style, moduleName) => {
  return [...new Set(taskStore.taskMes.trains.filter(item => item.style == style && item.moduleName == moduleName))];
}
const handleTimesInput = (item, e) => {
  item.times = parseInt(e);
};
const handleScoreInput = (item, e) => {
  item.score = e;
};
//删除
const handleClose_tag_0_train = (itemSub) => {
  taskStore.taskMes.trains = taskStore.taskMes.trains.filter(item => item.id != itemSub.id);
  taskStore.trainCheckedList = train_Store.trainCheckedList.filter(item => item.id != itemSub.id);
};
//选择模块
const train_Store = trainStore();
const moduleOpen = ref(false);
const handleModuleOpen = () => {
  //product_Store.products.find(item => item.act == 1)?.productId
  train_Store.trainList = [];

  moduleOpen.value = true;
};
const handleClose_module = () => {
  moduleOpen.value = false;
};
const eqName = ref();
const handleSubmit_module = async (e) => {
  train_Store.trainCheckedList = train_Store.trainCheckedList.filter(item => item.moduleId != undefined && item.moduleName != undefined);

  let trainsCopy = [...taskStore.taskMes.trains];
  taskStore.taskMes.trains = train_Store.trainCheckedList.map(train => ({
    ...train,
    score: null, // 或者设置为其他默认值
    times: null  // 或者设置为其他默认值
  }));

  train_Store.trainCheckedList.forEach(item => {
    if (!taskStore.taskMes.trains.some(t => t.style == item.style && t.moduleName == item.moduleName)) {
      taskStore.taskMes.trains.push({
        style: item.style,
        moduleName: item.moduleName,
        id: item.id,
        name: item.name,
        score: 0,
        times: 0
      })
    }
  })
  //旧值合并
  for (let i = 0; i < taskStore.taskMes.trains.length; i++) {
    let checked = trainsCopy.find(a => a.id == taskStore.taskMes.trains[i].id)
    if (checked) {
      taskStore.taskMes.trains[i].score = checked.score;
      taskStore.taskMes.trains[i].times = checked.times;
    }
  }

  // train.value = e.list;
  // eqName.value = e.eqName;
  moduleOpen.value = false;
  // ruleForm.trains = e.list;
};
/**********************************************添加发放对象 */
const objectsSelect = ref([]);
const emitObjects = ref([]);
//添加新的发放对象
const handleObjectChange = (e) => {
  objectSelectItem.value = null;
  let pushObject = emitObjects.value.find((item) => e == item.label);
  if (pushObject != null) {
    objectsSelect.value.push({ ClassId: pushObject.id, ClassName: pushObject.label, endTime: pushObject.endTime });
    emitObjects.value = emitObjects.value.filter((item) => item.value != e);
    objectKey.value++;
  }
};

watch(() => objectsSelect.value, () => {
  if (objectsSelect.value && objectsSelect.value.length > 0) {
    objectsSelect.value.forEach(item => {
      if (classEndDate.value == null)
        classEndDate.value = new Date(item.endTime);
      else
        classEndDate.value = new Date(item.endTime) < classEndDate.value ? new Date(item.endTime) : classEndDate.value;
    })
  }
}, { deep: true })

//是否新建的任务为空
const isErrorOnTasks = () => {
  return isBtActive.value && taskStore.taskMes.knows.length == 0 && taskStore.taskMes.tests.length == 0 && taskStore.taskMes.trains.length == 0;
};
//获得班级列表
const getClassList = async () => {
  var params = {
    data: {
      pageIndex: 1,
      pageSize: 100,
    },
    status: 2,
    courseId: null,
  };
  let res = await GetClassListByTea(params);
  if (res != null && res.length > 0) {
    for (let i = 0; i < res.length; i++) {
      emitObjects.value.push({ label: res[i].courseName + res[i].name, value: res[i].courseName + res[i].name, id: res[i].id, endTime: res[i].endTime });
    }
  }
};
getClassList();
/************************************************************周期 开始结束 时间 */
const cycle = ref();
const handleDaysInput = (e) => {
  cycle.value = e;
  ruleForm.cycle = e;
  //更新结束时间
  if (dateVal1.value) {
    dateVal2.value = AddDays(cycle.value);
  }
};
//节假日
const relaxOpts = [
  { label: "是", value: 0 },
  { label: "否", value: 1 },
];
//开始 结束时间
const dateVal1 = ref();
const dateVal2 = ref();

/******************************************************跳转知识库 */
const handleKnowAdd = () => {
  if (route.query.key == "add") {
    router.replace({ path: "/assignment/know_add", query: { key: "add" } });
  }
  if (route.query.key == "edit") {
    router.replace({ path: "/assignment/know_add", query: { key: "edit" } });
  }
  if (route.query.key == "emit") {
    router.replace({ path: "/assignment/know_add", query: { key: "emit" } });
  }
};
// const handleReadingOpen = () => {
//   //跳转知识库
//   //taskStore.routerPage = "know_select";
//   console.log("路由距离:", typeof route.path);
//   router.push({
//     path: "/knowledge/list8", //query传参path和name属性都可以
//     query: {
//       name: 123,
//     },
//   });
// };
//跳转到/knowledge/list8路由

/*******************************************************任务说明 */
const context = ref();
const handleContextInput = (e) => {
  context.value = e;
};

/*********************************************************表单校验 */
const ruleForm = reactive({
  issueInput: null,
  cycle: null,
  reads: [],
  tests: [],
  trains: [],
});

/********************************************************按钮 确认新建 确认编辑 确认发放 */
const getSubmitName = () => {
  if (route.query.key == "add") {
    return "确认新建";
  }
  if (route.query.key == "edit") {
    return "确认编辑";
  }
  if (route.query.key == "emit") {
    return "确认发放";
  }
};
/*******************************新建任务 */
const taskAdd = async () => {
  isBtActive.value = true;
  await formRef.value.validate();
  if (isErrorOnTasks()) {
    return;
  }
  let params = {
    Name: taskStore.taskMes.issueInput,
    CreateDate: new Date(),
    Cycle: taskStore.taskMes.cycle,
    IsPublic: taskStore.taskMes.isPublic,
    Knows: [...taskStore.taskMes.knows],
    Tests: [...taskStore.taskMes.tests],
    EqId: product_Store.products.find(item => item.act == 1)?.productId,
    Code: product_Store.products.find(item => item.act == 1)?.productId,
    Style: train_Store.trainCheckedStyle,
    EqName: "设备名称",
    Trains: taskStore.taskMes.trains,
    //Trains: c
  };
  let res = await TaskList_Insert2(params);
  if (res.Code == 200) {
    ElMessage.success("新建成功");
  } else {
    ElMessage.error("新建失败");
  }
  router.back();
};
const taskEdit = async () => {
  isBtActive.value = true;
  await formRef.value.validate();
  if (isErrorOnTasks()) {
    return;
  }
  let params = {
    Id: taskStore.taskMes.id,
    Name: taskStore.taskMes.issueInput,
    Cycle: taskStore.taskMes.cycle,
    IsPublic: taskStore.taskMes.isPublic,

    Knows: taskStore.taskMes.knows,
    Tests: taskStore.taskMes.tests,
    EqId: product_Store.products.find(item => item.act == 1)?.productId,
    Code: product_Store.products.find(item => item.act == 1)?.productId,
    EqName: "测试机",
    Trains: taskStore.taskMes.trains,
  }
  let res = await TaskList_Update2(params);
  if (res.Code == 200) {
    ElMessage.success("编辑成功");
  } else {
    ElMessage.error("编辑失败");
  }
  router.back();
};
const isEmitDiag = ref();
const taskEmit = async () => {
  isBtActive.value = true;
  await formRef.value.validate();
  if (isErrorOnTasks()) {
    return;
  }
  let params = {
    TaskId: taskStore.taskMes.id,
    Name: taskStore.taskMes.issueInput,
    CreateDate: new Date(),
    Cycle: taskStore.taskMes.cycle,
    StartDate: formatTimestamp(taskStore.taskMes.startDate),
    EndDate: formatTimestamp(taskStore.taskMes.endDate),
    IsRelax: taskStore.taskMes.isRelax,
    Emit: 1,
    Context: context.value,
    Classes: objectsSelect.value,
    IsPublic: taskStore.taskMes.isPublic,
    Knows: taskStore.taskMes.knows,
    Tests: taskStore.taskMes.tests,
    EqId: product_Store.products.find(item => item.act == 1)?.productId,
    Code: product_Store.products.find(item => item.act == 1)?.productId,
    EqName: "设备名称",
    Trains: taskStore.taskMes.trains,
  };
  let res = await TaskEmit_Insert(params)
  if (res.Code == 200) {
    ElMessage.success("发布成功");
  } else {
    ElMessage.error("发布失败");
  }
  isEmitDiag.value = true;
  //router.back();
};

const handleSubmitEmit = () => {
  isEmitDiag.value = false;
  router.back();
};
const handleSubmit = async () => {
  if (route.query.key == "add") {
    taskAdd();
  }
  if (route.query.key == "edit") {
    taskEdit();
  }
  if (route.query.key == "emit") {
    taskEmit();
  }
};
//取消
const handleCancel = () => {
  router.back();
};

/************************************************路由判断  新建 编辑 */
//路由名称
const getRouteName = () => {
  if (route.query.key == "add") {
    return "新建任务";
  }
  if (route.query.key == "edit") {
    return "编辑任务";
  }
  if (route.query.key == "emit") {
    return "发布任务";
  }
};
//编辑任务，数据初始化
const editData = () => {
  train_Store.trainCheckedList = taskStore.taskMes.trains.map(item => {
    return {
      id: item.id,
      style: item.style,
      moduleName: item.moduleName,
      name: item.name,
      moduleId: item.moduleId,
    }
  })

};
const routeInit = () => {
  if (route.query.key == "edit" || route.query.key == "emit") {
    editData();
  }
};
routeInit();
/***********************节假日 */
function AddDays(dayIn, dateVal1) {
  var date = new Date(dateVal1);
  var myDate = new Date(date.getTime() + (dayIn - 1) * 24 * 60 * 60 * 1000);
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var CurrentDate = year + "-";
  if (month >= 10) {
    CurrentDate = CurrentDate + month + "-";
  } else {
    CurrentDate = CurrentDate + "0" + month + "-";
  }
  if (day >= 10) {
    CurrentDate = CurrentDate + day;
  } else {
    CurrentDate = CurrentDate + "0" + day;
  }
  console.log(CurrentDate);
  return CurrentDate;
}
const unIncludedHolidays = (daysVal, dateVal1) => {
  //迭代出所有的时间
  let startDate = new Date(dateVal1);
  // 迭代每一天
  let i = 0;
  let days = 0;
  let endDate = new Date(startDate);
  while (1) {
    let currentDate = new Date(startDate);
    // 创建一个新的 Date 对象，避免直接修改 startDate
    currentDate.setDate(startDate.getDate() + i);

    // 将当前日期格式化为 "YYYY-MM-DD" 格式
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    if (holidays.map(item => item.date).includes(formattedDate)) {
    } else {
      days++;
    }
    i++;
    if (days == daysVal) {
      endDate = currentDate;
      break;
    }
  }
  return endDate;
}
const unIncludedHolidaysStart = (daysVal, dateVal2) => {
  //迭代出所有的时间
  let startDate = new Date(dateVal2);
  // 迭代每一天
  let i = 0;
  let days = 0;
  let endDate = new Date(startDate);
  while (1) {
    let currentDate = new Date(startDate);
    // 创建一个新的 Date 对象，避免直接修改 startDate
    currentDate.setDate(startDate.getDate() - i);

    // 将当前日期格式化为 "YYYY-MM-DD" 格式
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    if (holidays.map(item => item.date).includes(formattedDate)) {
    } else {
      days++;
    }
    i++;
    if (days == daysVal) {
      endDate = currentDate;
      break;
    }
  }
  return endDate;
}
const handleIncluedChange = (e) => {
  taskStore.taskMes.isRelax = e;
  //任务周期 + 任务开始时间 = 任务结束时间
  if (taskStore.taskMes.isRelax == 1 && taskStore.taskMes.cycle && taskStore.taskMes.startDate)
    taskStore.taskMes.endDate = AddDays(taskStore.taskMes.cycle, taskStore.taskMes.startDate);
  if (taskStore.taskMes.isRelax == 0 && taskStore.taskMes.cycle && taskStore.taskMes.startDate)
    taskStore.taskMes.endDate = unIncludedHolidays(taskStore.taskMes.cycle, taskStore.taskMes.startDate);

  startDateKey.value++;
  endDateKey.value++;
}
const handleStartDateChange = () => {
  //任务周期 + 任务开始时间 = 任务结束时间
  //暂时删除节假日
  // if (taskStore.taskMes.isRelax == 1 && taskStore.taskMes.cycle && taskStore.taskMes.startDate)
  //   taskStore.taskMes.endDate = AddDays(taskStore.taskMes.cycle, taskStore.taskMes.startDate);
  // if (taskStore.taskMes.isRelax == 0 && taskStore.taskMes.cycle && taskStore.taskMes.startDate)
  //   taskStore.taskMes.endDate = unIncludedHolidays(taskStore.taskMes.cycle, taskStore.taskMes.startDate);
  if (taskStore.taskMes.cycle && taskStore.taskMes.cycle > 0) {
    taskStore.taskMes.endDate = AddDays(taskStore.taskMes.cycle, taskStore.taskMes.startDate);
  } else {
    taskStore.taskMes.endDate = AddDays(1, taskStore.taskMes.startDate);
  }
};
const handleEndDateChange = () => {
  //暂时删除节假日
  // if (taskStore.taskMes.isRelax == 1 && taskStore.taskMes.startDate && taskStore.taskMes.endDate) {
  //   let startDate = unIncludedHolidaysStart(taskStore.taskMes.endDate);
  //   taskStore.taskMes.cycle = Math.round((new Date(taskStore.taskMes.endDate) - new Date(startDate)) / (24 * 3600 * 1000));
  // }
  // if (taskStore.taskMes.isRelax == 0 && taskStore.taskMes.startDate && taskStore.taskMes.endDate) {
  //   taskStore.taskMes.cycle = Math.round((new Date(taskStore.taskMes.endDate) - new Date(taskStore.taskMes.startDate)) / (24 * 3600 * 1000));
  // }
  taskStore.taskMes.cycle = Math.round((new Date(taskStore.taskMes.endDate) - new Date(taskStore.taskMes.startDate)) / (24 * 3600 * 1000)) + 1;
};
/*****************************检查是否知识库值 */
const KnowInit = () => {
  if (taskStore.routerPage == "my_add") {
    readding.value = [];
  }
  knowStore.knowIdList.forEach((item, index) => {
    readding.value.push({ id: item, name: knowStore.knowNameList[index] });
  });
};
KnowInit();


watch(() => taskStore.taskMes.trains, () => {
  if (taskStore.taskMes.trains && taskStore.taskMes.trains.length > 0) {
    //取tag_div_div_font的最大宽度
    nextTick(() => {
      let tag_div_div_font = document.getElementsByClassName("tag_train");
      let maxWidth = 0;
      for (let i = 0; i < tag_div_div_font.length; i++) {
        if (tag_div_div_font[i].offsetWidth > maxWidth) {
          maxWidth = tag_div_div_font[i].offsetWidth;
        }
      }
      for (var i = 0; i < tag_div_div_font.length; i++) {
        tag_div_div_font[i].style.width = maxWidth + "px";
      }
    })
  }
}, { deep: true, immediate: true })
</script>

<style lang="scss" scoped>
@import url("../../style/jiang/css/task_form.scss");
//导航
@import url("../../style/jiang/css/navigation_bar.scss");
//表单
@import url("../../style/jiang/css/task_add_emit.scss");

@import url("../../style/jiang/css/select_input.scss");
@import url("../../style/jiang/font/font.scss");
@import url("../../style/tip.scss");



//字体
:deep(.date_div) {
  width: 281px;
  height: 53px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.12);
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: #24c4d3;
}

.obj_task {
  display: flex;

  .obj_task_add {
    margin-left: 19px;
    width: 145px;

    :deep(.el-input__wrapper) {
      height: 53px;
      background: #ffffff;
      border-radius: 9px;
    }
  }
}

.obj_task>* {
  margin-right: 19px;
}

.select_div {
  display: flex;
}

.select_div>* {
  margin-right: 20px;
}

.text_0 {
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  opacity: 0.65;
}

.text_1 {
  font-family: Noto Sans S Chinese;
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  opacity: 0.7;
}

.text_2 {
  font-family: Noto Sans S Chinese;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  opacity: 0.7;
}

//任务内容
.tag_task {
  margin-right: 14.4px;
  margin-bottom: 15px;
}

.tag_train {
  margin-right: 14.4px;
  margin-bottom: 15px;
}

.train_input {
  margin-right: 14.4px;
  margin-bottom: 15px;
}

//本地上传图片
.up_task_img {
  margin-right: 7px;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
