const express = require("express");

const app = express();

const dataJson1 = {
  key1: "key1",
  key2: "key2",
  key3: "key3",
  key4: "key4",
  key5: "key5",
  key6: "key6",
  key7: "key7",
  key8: "key8",
  key9: "key9",
};
const dataJson2 = {
  api1: "api1",
  api2: "api2",
  api3: "api3",
  api4: "api4",
  api5: "api5",
  api6: "api6",
  api7: "api7",
  api8: "api8",
  api9: "api9",
};

app.get("/eventV2/getEventListByDimension", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({
    code: 200,
    data: {
      count: 123,
      list: [
        {
          event_id: 2,
          dimension: 3,
          mmp_name: "adjust",
          mtg_event_name: "af_purchase",
          standard_event_name: "purchase",
          deep_event_name: "purchase_complete",
          status: 1,
          updated: 1676260156,
        },
      ],
    },
  });
});

app.get("/allowPackage", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({
    code: 200,
    data: {
      is_allow: false,
    },
  });
});

app.get("/dbApi1", (req, res) => {
  res.send(dataJson1);
});
app.get("/dbApi2", (req, res) => {
  res.send(dataJson2);
});

app.get("/api/v1/audience/options", (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({
    country: [
      {
        label: "US",
        value: "US",
      },
      {
        label: "CN",
        value: "CN",
      },
    ],
    deviceType: [
      {
        label: "IDFA",
        value: 1,
      },
      {
        label: "IMEI",
        value: 2,
      },
      {
        label: "GAID",
        value: 3,
      },
      {
        label: "OAID",
        value: 4,
      },
      {
        label: "IFDA MD5",
        value: 5,
      },
      {
        label: "IMEI MD5",
        value: 6,
      },
      {
        label: "GAID MD5",
        value: 7,
      },
      {
        label: "OAID MD5",
        value: 8,
      },
    ],
    dataSource: [
      {
        label: "MtG-ADX",
        value: 1,
      },
      {
        label: "MtG-SDK",
        value: 2,
      },
      {
        label: "GA",
        value: 3,
      },
      {
        label: "GA2343",
        value: 4,
      },
    ],
  });
});

app.get("/audience/detail", (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({
    id: 1,
    ta_id: 1,
    audience_name: "audience_name",
    adv_audience_name: "adv_audience_name",
    created_from: 2,
    audience_type: 2,
    platform: 1,
    status: 1,
    geo: ["CN"],
    device_type: [],
    data_source: [],
    calcu_period: 1,
    data_st_date: "2022-10-10",
    data_ed_date: "2022-10-10",
    logic_formula: "2022-10-10",
    ta_rule_info: [
      {
        logic_code: "",
        logic_type: 1,
        logic_rule: {
          begin_date: "2022-10-10",
          end_date: "2022-10-10",
          lastest_days: 1,
          event_type: "",
          price_freq_range: "",
          package_type: 1,
          package_list: [],
          package_num: 1,
          package_required_num: 1,
          mtg_tags: [],
          event_days: 12,
          media_array: [],
          channel_array: [],
          ad_types: [],
          ta_ids: [],
          interior_logic: 1,
        },
      },
    ],
  });
});

app.get("/api/audience/getExternalAudienceList", (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send([
    {
      id: 1,
      ta_id: "1",
      ta_name: "ta_name_1",
      adv_ta_name: "adv_ta_name_1",
      device_type: "",
    },
    {
      id: 2,
      ta_id: "13",
      ta_name: "ta_name_3",
      adv_ta_name: "adv_ta_name_3",
      device_type: "",
    },
  ]);
});

app.listen(1111, (req, res) => {
  console.log("run in localhost");
});
