import React, { useState, useEffect } from 'react'
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';

function Edit(props) {
  // rc-form 会给当前组件添加form的一些方法
  const { getFieldProps, validateFields } = props.form;
  const { user: { editUserAsync, getUserAsync, avatar, phone, sign } } = useStoreHook()
  const [files, setFiles] = useState([{ url: avatar }])

  const handleChange = (files) => {
    if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
      return Toast.fail('图片大小不能大于0.5M')
    }
    console.log(files);
    setFiles(files)
  }
  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息补充完整');
        return;
      } else {
        editUserAsync({
          avatar: files[0].url,
          phone: value.phone,
          sign: value.sign,
        })
      }
    });
  }

  useEffect(() => {
    getUserAsync()
  }, [])

  return (
    <div className="user-edit">
      <List>
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />
        <InputItem
          {...getFieldProps('tel', {
            rules: [{ required: true }],
            initialValue: phone
          })}
          placeholder="电话" >
          电话：
        </InputItem>
        <InputItem
          {...getFieldProps('sign', {
            rules: [{ required: true }],
            initialValue: sign
          })}
          placeholder="签名" >
          签名：
        </InputItem>
      </List>
      <Button onClick={handleSubmit} type="warning" style={{ marginTop: '20px' }}>修改</Button>
    </div>
  )
}

export default createForm()(Edit)
