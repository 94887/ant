const farm_type = require("../data/farm-type");
const farm_type_translation = require("../data/farm-type-translation");
const crop = require("../data/crop");
const crop_translation = require("../data/crop-translation");
const grow_style = require("../data/grow-style");
const grow_style_translation = require("../data/grow-style-translation");
const grow_method = require("../data/grow-method");
const grow_method_translation = require("../data/grow-method-translation");
const stage = require("../data/stage");
const stage_translation = require("../data/stage-translation");
const grow_plan = require("../data/grow-plan");
const grow_plan_stage = require("../data/grow-plan-stage");
// const cycle_frequency_types = require("../data/cycle-frequency-types");
// const cycle_frequency_types_translation = require("../data/cycle-frequency-types-translation");
const device_types = require("../data/device-types");
const device_types_translation = require("../data/device-types-translation");
const sensor_types = require("../data/sensor-types");
const sensor_types_translation = require("../data/sensor-types-translation");
const switch_types = require("../data/switch-types");
const switch_types_translation = require("../data/switch-types-translation");
const time_frequency = require("../data/time-frequency");
const time_frequency_translation = require("../data/time-frequency-translation");
const trigger_change_types = require("../data/trigger-change-types");
const trigger_change_types_translation = require("../data/trigger-change-types-translation");
const trigger_sensor_types = require("../data/trigger-sensor-types");
const trigger_sensor_types_translation = require("../data/trigger-sensor-types-translation");
// const lang = require("../data/lang");
// const lang_translation = require("../data/lang-translation");
const role = require("../data/role");
const feature = require("../data/feature");
const role_feature_mapping = require("../data/role-feature-mapping");
const task_category = require("../data/task-category");
const task_category_translation = require("../data/task-category-translation");

//new tables;
const farm_type_crop_category = require("../data/farm-type-crop-category");
const crop_category = require("../data/crop-category");
const crop_category_translation = require("../data/crop-category-translation");
const farm_type_grow_method = require("../data/farm-type-grow-method");
const task_sub_category = require("../data/task-sub-category");
const task_sub_category_translation = require("../data/task-sub-category-translation");
const plan = require('../data/plan')
const crop_params = require('../data/crop-params')

exports.seed = knex => {
  return (
    knex("grow_plan_stage").del()
      .then(() => {
        return knex("grow_plan").del();
      })
      .then(() => {
        return knex("crop_category_translation").del();
      })
      .then(() => {
        return knex("crop_translation").del();
      })
      .then(() => {
        return knex("grow_method_translation").del();
      })
      .then(() => {
        return knex("grow_style_translation").del();
      })
      .then(() => {
        return knex("stage_translation").del();
      })
      .then(() => {
        return knex("sensor_types_translation").del();
      })
      .then(() => {
        return knex("device_types_translation").del();
      })
      .then(() => {
        return knex("stage").del();
      })
      .then(() => {
        return knex("farm_type_translation").del();
      })
      .then(() => {
        return knex("farm_type").del();
      })
      .then(() => {
        return knex("grow_style").del();
      })
      .then(() => {
        return knex("grow_method").del();
      })
      .then(() => {
        return knex("crop_params").del();
      })
      .then(() => {
        return knex("crop").del();
      })
      .then(() => {
        return knex("crop_category").del();
      })
      .then(() => {
        return knex("sensor_types").del();
      })
      .then(() => {
        return knex("device_types").del();
      })
      .then(() => {
        return knex("cycle_frequency_types_translation").del();
      })
      .then(() => {
        return knex("cycle_frequency_types").del();
      })
      .then(() => {
        return knex("sensor_types_translation").del();
      })
      .then(() => {
        return knex("sensor_types").del();
      })
      .then(() => {
        return knex("switch_types_translation").del();
      })
      .then(() => {
        return knex("switch_types").del();
      })
      .then(() => {
        return knex("time_frequency_translation").del();
      })
      .then(() => {
        return knex("time_frequency").del();
      })
      .then(() => {
        return knex("trigger_change_types_translation").del();
      })
      .then(() => {
        return knex("trigger_change_types").del();
      })
      .then(() => {
        return knex("trigger_sensor_types_translation").del();
      })
      .then(() => {
        return knex("trigger_sensor_types").del();
      })
      // .then(() => {
      //   return knex("lang_translation").del();
      // })
      // .then(() => {
      //   return knex("lang").del();
      // })
      .then(() => {
        return knex("task_sub_category_translation").del();
      })
      .then(() => {
        return knex("task_category_translation").del();
      })
      .then(() => {
        return knex("task_sub_category").del();
      })
      .then(() => {
        return knex("task_category").del();
      })
      .then(() => {
        return knex("role").del();
      })
      .then(() => {
        return knex("feature").del();
      })
      .then(() => {
        return knex("role_feature_mapping").del();
      })
      .then(() => {
        return knex('plan').del()
      })

      /** */
      .then(() => {
        return knex("farm_type_crop_category").insert(farm_type_crop_category);
      })
      .then(() => {
        return knex("crop_category_translation").insert(
          crop_category_translation
        );
      })
      .then(() => {
        return knex("farm_type_grow_method").insert(farm_type_grow_method);
      })
      .then(() => {
        return knex("crop_category").insert(crop_category);
        /** */
      })
      .then(() => {
        return knex("crop").insert(crop);
      })
      .then(() => {
        return knex("crop_translation").insert(crop_translation);
      })
      .then(() => {
        return knex("crop_params").insert(crop_params);
      })
      .then(() => {
        return knex("grow_method").insert(grow_method);
      })
      .then(() => {
        return knex("grow_method_translation").insert(grow_method_translation);
      })
      .then(() => {
        return knex("grow_style").insert(grow_style);
      })
      .then(() => {
        return knex("grow_style_translation").insert(grow_style_translation);
      })
      .then(() => {
        return knex("stage").insert(stage);
      })
      .then(() => {
        return knex("stage_translation").insert(stage_translation);
      })
      .then(() => {
        return knex("farm_type").insert(farm_type);
      })
      .then(() => {
        return knex("farm_type_translation").insert(farm_type_translation);
      })
      .then(() => {
        return knex("grow_plan").insert(grow_plan);
      })
      .then(() => {
        return knex.raw(
          "select setval('grow_plan_id_seq', max(id)) from grow_plan"
        );
      })
      .then(() => {
        return knex("grow_plan_stage").insert(grow_plan_stage);
      })
      .then(() => {
        return knex.raw(
          "select setval('grow_plan_stage_id_seq', max(id)) from grow_plan_stage"
        );
      })
      // .then(() => {
      //   return knex("cycle_frequency_types").insert(cycle_frequency_types);
      // })
      // .then(() => {
      //   return knex("cycle_frequency_types_translation").insert(
      //     cycle_frequency_types_translation
      //   );
      // })
      .then(() => {
        return knex("device_types").insert(device_types);
      })
      .then(() => {
        return knex("device_types_translation").insert(
          device_types_translation
        );
      })
      .then(() => {
        return knex("sensor_types").insert(sensor_types);
      })
      .then(() => {
        return knex("sensor_types_translation").insert(
          sensor_types_translation
        );
      })
      .then(() => {
        return knex("switch_types").insert(switch_types);
      })
      .then(() => {
        return knex("switch_types_translation").insert(
          switch_types_translation
        );
      })
      .then(() => {
        return knex("time_frequency").insert(time_frequency);
      })
      .then(() => {
        return knex("time_frequency_translation").insert(
          time_frequency_translation
        );
      })
      .then(() => {
        return knex("trigger_change_types").insert(trigger_change_types);
      })
      .then(() => {
        return knex("trigger_change_types_translation").insert(
          trigger_change_types_translation
        );
      })
      .then(() => {
        return knex("trigger_sensor_types").insert(trigger_sensor_types);
      })
      .then(() => {
        return knex("trigger_sensor_types_translation").insert(
          trigger_sensor_types_translation
        );
      })
      // .then(() => {
      //   return knex("lang").insert(lang);
      // })
      // .then(() => {
      //   return knex("lang_translation").insert(lang_translation);
      // })
      .then(() => {
        return knex("task_category").insert(task_category);
      })
      .then(() => {
        return knex("task_category_translation").insert(
          task_category_translation
        );
      })
      .then(() => {
        return knex("role").insert(role);
      })
      .then(() => {
        return knex("feature").insert(feature);
      })
      .then(() => {
        return knex("role_feature_mapping").insert(role_feature_mapping);
      })
      .then(() => {
        return knex("task_sub_category").insert(task_sub_category);
      })
      .then(() => {
        return knex("task_sub_category_translation").insert(task_sub_category_translation);
      })
      .then(() => {
        return knex('plan').insert(plan)
      })
  );
};
