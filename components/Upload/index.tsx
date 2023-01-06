import { computed, defineComponent, ref, reactive } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { Upload, Modal } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import { toSize, AntToast } from '../../util/tools';
import { request } from '../../util/http';
import { propsTypes, Multimedia } from './type';

const Uploads = defineComponent({
  name: 'VcUpload',
  props: propsTypes(),
  emits: ['change', 'preview'],
  setup(props, { slots, emit }) {
    const { prefixCls, api } = useConfigInject('upload', props);

    const { multiple, accept, size } = props;
    const fileList = ref([]);
    if (props.fileList) {
      fileList.value = props.fileList.map((e, index) => {
        return {
          uid: index + 1,
          status: 'done',
          tempUrl: e.url,
          url: e.url.includes('http') ? e.url : api + e.url
        };
      });
    }

    // 将数据返回上一级
    const fileChange = () => {
      const list = fileList.value.filter((e) => e.tempUrl);
      emit(
        'change',
        list.map((e) => ({
          url: e.tempUrl
        }))
      );
    };

    const preview = reactive({
      visible: false,
      img: '',
      title: ''
    });

    const handleCancel = () => {
      preview.visible = false;
      preview.title = '';
    };
    // 自定义上传
    const customRequestLoad = (fileObj) => {
      const { file } = fileObj;
      fileList.value.push({
        uid: fileObj.file.uid,
        percent: 0,
        status: 'uploading',
        url: ''
      });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', '0');

      // 上传进度条
      let percent = 1;
      const intervalId = setInterval(() => {
        if (percent <= 40) {
          percent += 0.8;
        } else if (percent <= 80) {
          percent += 0.5;
        } else if (percent <= 90) {
          percent += 0.3;
        } else if (percent <= 99) {
          percent += 0.1;
        } else {
          percent += 0;
        }

        fileList.value = fileList.value.map((e) => {
          if (e.uid === fileObj.file.uid) {
            return {
              ...e,
              percent: Number(percent.toFixed(2)),
              status: 'uploading'
            };
          }
          return e;
        });
      }, 1000 * 0.1);
      if (!props.onlyPreview) {
        request({
          api,
          url: props.interface,
          method: 'post',
          ContentType: 'multipart/form-data',
          data: formData
        })
          .then((res) => {
            clearInterval(intervalId);
            fileList.value = fileList.value.map((e) => {
              if (e.uid === fileObj.file.uid) {
                return {
                  ...e,
                  percent: 100,
                  tempUrl: res.data,
                  status: res.code === 200 ? 'done' : 'error',
                  url: res.code === 200 ? api + res.data : ''
                };
              }
              return e;
            });
            fileChange();
          })
          .catch(() => {
            clearInterval(intervalId);
            fileList.value = fileList.value.map((e) => {
              if (e.uid === fileObj.file.uid) {
                return {
                  ...e,
                  percent: 100,
                  status: 'error'
                };
              }
              return e;
            });
          });
      }
    };

    // 上传前验证
    const beforeUpload = (e) => {
      // const type = e.type.split('/')[1];
      console.log(fileList.value, props.maxCount);
      if (!props.maxCount || fileList.value.length < props.maxCount) {
        if (
          !accept ||
          (accept.includes(e.type.split('/')[1]) && e.type.length > 0)
        ) {
          if (!size || size > e.size) {
            return e;
          }
          AntToast({
            content: '文件体积太大，无法上传，请缩小体积',
            type: 'error'
          });
          return false;
        }
        AntToast({
          content: '不支持该格式文件，请切换文件',
          type: 'error'
        });
      }
      AntToast({
        content: '超出文件上传最大数量，无法上传',
        type: 'error'
      });
      return false;
    };

    const styl = computed(() => {
      const { width, height, onlyPreview } = { ...props };
      return {
        '--uploadWidth': toSize(width),
        '--uplodaHeight': toSize(height),
        '--uploadDisplay': onlyPreview ? 'none' : 'inline-block'
      };
    });

    return () => (
      <div class={`${prefixCls.value}`} style={styl.value as any}>
        <div style={{ display: 'flex' }}>
          <Upload
            accept={accept}
            multiple={multiple}
            fileList={fileList.value}
            showUploadList={true}
            customRequest={customRequestLoad}
            beforeUpload={beforeUpload}
            maxCount={1}
            progress={{
              strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068'
              },
              strokeWidth: 3
            }}
            listType='picture-card'
            onChange={(info: UploadChangeParam) => {
              const { file } = info;
              if (file.status === 'removed') {
                const index = fileList.value.findIndex(
                  (e) => e.uid === file.uid
                );
                fileList.value.splice(index, 1);
                fileChange();
              }
              // 上传中
              // if (file.status === 'uploading') {
              // }
              // 上传结束
              if (file.status === 'done') {
                fileChange();
              }
              // 上传成功
              if (file.status === 'success') {
                fileChange();
              }
            }}
            onPreview={async (file) => {
              preview.img = file.url;
              preview.title = file.name || '图片';
              preview.visible = true;
            }}
          >
            <div class='box'>
              <PlusOutlined />
            </div>
          </Upload>
        </div>

        <Modal
          visible={preview.visible}
          title={preview.title}
          footer={null}
          onCancel={() => {
            handleCancel();
          }}
        >
          <img alt='example' style={{ width: '100%' }} src={preview.img} />
        </Modal>
      </div>
    );
  }
});

export default withInstall(Uploads);
