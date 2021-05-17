'use strict'

const _ = require('lodash')
const moment = require('moment')
const { DEFAULT_DATE_FORMAT } = require('./helper')

module.exports = {
  msToTime: (duration) => {
    let seconds = parseInt((duration / 1000) % 60)
    let minutes = parseInt((duration / (1000 * 60)) % 60)
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? '0' + hours : hours
    minutes = (minutes < 10) ? '0' + minutes : minutes
    seconds = (seconds < 10) ? '0' + seconds : seconds

    return hours + ':' + minutes + ':' + seconds
  },
  setFieldFilter: function setFieldFilter(fields, table) {
    return table ? fields.map(f => `${table}.${f}`) : fields
  },
  createFieldFilter: (mandatoryFields, defaultFields, dataFields, table) => {
    let optionalFields = (_.size(dataFields) ? dataFields : defaultFields)
    let fields = [...mandatoryFields, ...optionalFields];
    return table ? fields.map(f => `${table}.${f}`) : fields
  },
  trimJSON: function trimJSON(entity) {
    if (_.isArray(entity) || _.isObject(entity)) {
      return _.forEach(entity, (value, key) => {
        entity[key] = trimJSON(value)
      })
    } else if (_.isString(entity)) {
      return entity.trim()
    } else {
      return entity
    }
  },
  arrayToObject: (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {}),
  cleanPath: (path) => {
    if (path[0] === '/')
      return path.substr(1)
    return path
  },
  formatDate: (date, from, to = DEFAULT_DATE_FORMAT) => {
    if (date === "today") return moment().format(to);
    if (date === "tomorrow")
      return moment()
        .add(1, "days")
        .format(to);
    if (date === "yesterday")
      return moment()
        .subtract(1, "days")
        .format(to);
    if (!moment(date, from).isValid()) return "-";
    if (moment(date, from).format(to) === moment().format(to)) return "today";
    if (
      moment(date, from).format(to) ===
      moment()
        .subtract(1, "days")
        .format(to)
    )
      return "yesterday";
    if (
      moment(date, from).format(to) ===
      moment()
        .add(1, "days")
        .format(to)
    )
      return "tomorrow";

    return moment(date, from).format(to);
  }
}