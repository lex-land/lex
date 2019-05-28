import './PresetDateRange.less';
import './form-item.less';
import {
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
} from 'antd';
import { Case, Switch } from '@core/components';
import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { FieldProps } from 'formik';
import { genLabel } from '@helpers/locales';
import { getLocal } from '@helpers/fetch';
import { useAsync } from 'react-use';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { MonthPicker, WeekPicker } = DatePicker;

const dateUtils = {
  getCurrentDay(dayMoment: Moment) {
    return [moment(dayMoment), moment(dayMoment)];
  },
  getCurrentWeek(dayMoment: Moment) {
    const lastMonday = moment(dayMoment).startOf('isoWeek'); // 周一日期
    const lastSunday = moment(dayMoment).endOf('isoWeek'); // 周日日期
    return [lastMonday, lastSunday];
  },
  getCurrentMonth(dayMoment: Moment) {
    const lastMonday = moment(dayMoment).startOf('month'); // 周一日期
    const lastSunday = moment(dayMoment).endOf('month'); // 周日日期
    return [lastMonday, lastSunday];
  },
  getCurrentQuarter(dayMoment: Moment) {
    const lastMonday = moment(dayMoment).startOf('quarter'); // 周一日期
    const lastSunday = moment(dayMoment).endOf('quarter'); // 周日日期
    return [lastMonday, lastSunday];
  },
};

export function disableThreeYears(current: any) {
  return (
    current <
    moment()
      .subtract(3, 'year')
      .endOf('day')
  );
}

export function disabledFuture(current: any) {
  // Can not select days before today and today
  return disableThreeYears(current) || current > moment().endOf('day');
}

const initRange = (value: any): any[] => {
  if (typeof value === 'string') {
    return value.split('/');
  } else {
    return value;
  }
};

const presetRanges = {
  今日: [moment(), moment()],
  昨日: [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
  本周: [moment().startOf('isoWeek'), moment()],
  本月: [moment().startOf('month'), moment()],
  上季: [
    moment()
      .subtract(1, 'quarter')
      .startOf('quarter'),
    moment()
      .subtract(1, 'quarter')
      .endOf('quarter'),
  ],
  本季: [moment().startOf('quarter'), moment()],
};

export const getTimeDistance = (type: keyof typeof presetRanges): Moment[] => {
  return presetRanges[type];
};

export const timestampToMoment = (i: any) => (i ? moment.unix(i) : i);
export const momentToTimestamp = (i: Moment) => (i ? i.unix() : i);

interface FieldPropsPlus extends FieldProps {
  label?: string;
}

export const InputField = (props: FieldPropsPlus) => {
  return (
    <Form.Item className="custom-form-item" label={genLabel(props.field.name)}>
      <Input
        allowClear
        {...props.field}
        name={props.field.name}
        placeholder="请输入"
      />
    </Form.Item>
  );
};

export const SelectField = (
  props: FieldPropsPlus & { fetch: string; onChange?: any },
) => {
  const { loading, value: json = { data: [] } } = useAsync(
    () => getLocal(props.fetch),
    [],
  );
  const data = json.data;
  const handleChange = (value: string) => {
    props.form.setFieldValue(props.field.name, value);
    props.onChange && props.onChange(value);
  };
  return (
    <Form.Item className="custom-form-item" label={genLabel(props.field.name)}>
      <Select
        {...props.field}
        notFoundContent={loading ? <Spin size="small" /> : null}
        onChange={handleChange}
        style={{ width: '100%' }}
        allowClear={true}
        placeholder="请选择"
      >
        {data.map((i: any) => (
          <Option key={i.value} value={i.value}>
            {i.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const CascaderField = (
  props: FieldPropsPlus & { fetch: string; onChange?: any },
) => {
  const value = initRange(props.field.value);
  const { loading, value: json = { data: [] } } = useAsync(
    () => getLocal(props.fetch),
    [],
  );
  const data = json.data;
  const handleChange = (cascaderValue: string[]) => {
    props.form.setFieldValue(props.field.name, cascaderValue);
    props.onChange && props.onChange(cascaderValue);
  };
  return (
    <Form.Item className="custom-form-item" label={genLabel(props.field.name)}>
      <Cascader
        changeOnSelect
        value={value}
        notFoundContent={loading ? <Spin size="small" /> : null}
        onChange={handleChange}
        options={data}
        style={{ width: '100%' }}
        allowClear={true}
        placeholder="请选择"
      />
    </Form.Item>
  );
};

export const RangePickerField = (props: FieldPropsPlus & { ranges?: any }) => {
  const value = initRange(props.field.value).map(timestampToMoment);
  const handleChange = (dates: any) => {
    props.form.setFieldValue(props.field.name, dates.map(momentToTimestamp));
  };

  return (
    <Form.Item
      className="custom-form-item"
      label={props.label || genLabel(props.field.name)}
    >
      <RangePicker
        style={{ width: '100%' }}
        name={props.field.name}
        disabledDate={disabledFuture}
        value={value}
        onChange={handleChange}
      />
    </Form.Item>
  );
};

export const RangeInputNumberField = (
  props: FieldPropsPlus & { min: number },
) => {
  const [start, end] = initRange(props.field.value);
  const error = props.form.errors[props.field.name];
  const touched = props.form.touched[props.field.name];
  let help;
  let validateStatus: any;
  if (touched && error) {
    help = error;
    validateStatus = 'error';
  }
  return (
    <Form.Item
      className="custom-form-item"
      label={props.label || genLabel(props.field.name)}
      help={help}
      validateStatus={validateStatus}
    >
      <Row type="flex" justify="space-between">
        <Col>
          <InputNumber
            min={props.min}
            value={start}
            name={props.field.name}
            onChange={startValue =>
              props.form.setFieldValue(props.field.name, [startValue, end])
            }
            placeholder="请输入"
          />
        </Col>
        <Col>
          <span>~</span>
        </Col>
        <Col>
          <InputNumber
            min={props.min}
            value={end}
            name={props.field.name}
            onChange={endValue =>
              props.form.setFieldValue(props.field.name, [start, endValue])
            }
            placeholder="请输入"
          />
        </Col>
      </Row>
    </Form.Item>
  );
};

export const PresetDateRange = (props: any) => {
  const value = initRange(props.value || '').map(timestampToMoment);
  // const [currentValue, setCurrentValue] = useState(value);
  const isActive = (type: any) => {
    const rangePickerValue = value;
    const presetValue = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return 'RangePreset';
    }
    if (
      rangePickerValue[0].isSame(presetValue[0], 'day') &&
      rangePickerValue[1].isSame(presetValue[1], 'day')
    ) {
      return 'RangePreset--Active';
    }
    return 'RangePreset';
  };
  const handleChange = (dates: any) => {
    props.onChange({ [props.name]: dates.map(momentToTimestamp) });
    // setCurrentValue(dates);
  };
  const selectDate = (type: any) => {
    handleChange(getTimeDistance(type));
    // setCurrentValue([]);
  };

  return (
    <span>
      <a className={isActive('今日')} onClick={() => selectDate('今日')}>
        今日
      </a>
      <a className={isActive('昨日')} onClick={() => selectDate('昨日')}>
        昨日
      </a>
      <a className={isActive('本周')} onClick={() => selectDate('本周')}>
        本周
      </a>
      <a className={isActive('本月')} onClick={() => selectDate('本月')}>
        本月
      </a>
      <RangePicker
        allowClear={props.allowClear}
        value={value}
        disabledDate={disabledFuture}
        onChange={handleChange}
      />
    </span>
  );
};

export function disabledDay(current: any) {
  // Can not select days before today and today
  return (
    disableThreeYears(current) || current.endOf('day') >= moment().endOf('day')
  );
}

export const disableWeek = (current: any) => {
  const [, sunday] = dateUtils.getCurrentWeek(moment());
  const lastSunday = sunday.subtract('week', 1);
  return (
    disableThreeYears(current) ||
    current.isSame(lastSunday) ||
    current.isAfter(lastSunday)
  );
};

export const disableMonth = (current: any) => {
  const [, endDayOfMonth] = dateUtils.getCurrentMonth(moment());
  const lastEndDayOfMonth = endDayOfMonth.subtract('month', 1);
  return (
    disableThreeYears(current) ||
    current.isSame(lastEndDayOfMonth) ||
    current.isAfter(lastEndDayOfMonth)
  );
};

export const disableQuarter = (current: any) => {
  const [, endDayOfQuarter] = dateUtils.getCurrentQuarter(moment());
  const lastEndDayOfQuarter = endDayOfQuarter.subtract('quarter', 1);
  return (
    disableThreeYears(current) ||
    current.isSame(lastEndDayOfQuarter) ||
    current.isAfter(lastEndDayOfQuarter)
  );
};
const RadioLabels = {
  day: '按日',
  week: '按周',
  month: '按月',
  quarter: '按季',
};

const genRadioLabel = (i: any) => {
  return (RadioLabels as any)[i];
};

export const SelectableRanger = (props: any) => {
  const value = initRange(props.value || '').map(timestampToMoment);
  const [currentValue, setCurrentValue] = useState(value);
  const [activeKey, setActiveKey] = useState(props.defaultActiveKey);
  const [open, setOpen] = useState(false);
  const radioFields = props.fields || [];
  const handleChange = (fnName: keyof typeof dateUtils) => {
    return (val: any) => {
      if (val) {
        setCurrentValue(dateUtils[fnName](val));
        props.onChange({
          [props.name]: dateUtils[fnName](val).map(momentToTimestamp),
        });
      } else {
        props.onChange({ [props.name]: '' });
      }
      setOpen(false);
    };
  };
  const handleRadioGroupChange = (value: string) => {
    setActiveKey(value);
    setCurrentValue([]);
    setOpen(true);
  };
  return (
    <span style={{ display: 'inline-block' }}>
      <RadioGroup
        value={activeKey}
        onChange={e => handleRadioGroupChange(e.target.value)}
      >
        {radioFields.map((i: string) => (
          <RadioButton key={i} value={i}>
            {genRadioLabel(i)}
          </RadioButton>
        ))}
      </RadioGroup>
      <span style={{ marginLeft: 10 }}>
        <Switch on={activeKey}>
          <Case value="day">
            <DatePicker
              allowClear={false}
              value={currentValue[0]}
              disabledDate={disabledDay}
              onOpenChange={open => setOpen(open)}
              onChange={handleChange('getCurrentDay')}
              placeholder="请选择日期"
              style={{ width: 278 }}
              open={open}
            />
          </Case>
          <Case value="week">
            <WeekPicker
              allowClear={false}
              value={currentValue[0]}
              disabledDate={disableWeek}
              onChange={handleChange('getCurrentWeek')}
              placeholder="请选择星期"
              style={{ width: 278 }}
              open={open}
              onOpenChange={open => setOpen(open)}
            />
          </Case>
          <Case value="month">
            <MonthPicker
              allowClear={false}
              value={currentValue[0]}
              disabledDate={disableMonth}
              onChange={handleChange('getCurrentMonth')}
              placeholder="请选择月份"
              style={{ width: 278 }}
              open={open}
              onOpenChange={open => setOpen(open)}
            />
          </Case>
          <Case value="quarter">
            <MonthPicker
              value={currentValue[0]}
              allowClear={false}
              disabledDate={disableQuarter}
              onChange={handleChange('getCurrentQuarter')}
              placeholder="请选择季度"
              format="YYYY年 第Q季度"
              style={{ width: 278 }}
              open={open}
              onOpenChange={open => setOpen(open)}
            />
          </Case>
        </Switch>
      </span>
    </span>
  );
};
