<template>
  <div style="text-align: center;width:80%;margin:auto;" class="asign-box">
    <el-row type="flex" :gutter="20">
      <el-col :span="12"></el-col>
      <el-col v-for="i in item.top" :key="i.type">{{i.name}}</el-col>
    </el-row>
    <el-row type="flex" :gutter="20" v-for="(u,ui) in item.user" :key="u.uid">
      <el-col :span="12">{{u.name}}</el-col>
      <el-col v-for="(check, ci) in u.check" :key="check.type">
        <el-checkbox v-model="item.user[ui].check[ci].check" @change="checkChange(ui,ci)" />
      </el-col>
    </el-row>
    <AddControl @add:click="addClick"></AddControl>
    <el-dialog title="分配" :visible.sync="dialogFormVisible" center>
      <el-table :data="selectedUsers" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column property="creationTime" label="日期" width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.$index, scope.row)">View</el-button>
            <el-button size="mini" type="danger" @click="handleAll(scope.$index, scope.row)">All</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import request from '../api/axis.js'
  import utils from '../api/utils.js'
  import AddControl from '@/components/AddControl.vue'
  export default {
    created() {
      request.GetAuthorityTypes().then(res => {
        this.item.top = res.data.result.items
        request.GetAssignAuthorityOfUser({
          id: this.$route.params.id
        }).then(r => {
          this.item.user = r.data.result.items
          this.initData()
        })
      })
    },
    components: {
      AddControl
    },
    data() {
      return {
        item: {
          top: [{
            name: '查看',
            type: 'View'
          }],
          user: [{
            uid: 1,
            name: 'hohohooo',
            authority: ['View', 'EditItem']
          }]
        },
        dialogFormVisible: false,
        form: 0,
        selectedUsers: []
      }
    },
    methods: {
      initData() {
        for (let i = 0; i < this.item.user.length; i++) {
          this.initDataLine(i)
        }
      },
      initDataLine(i){
        let u = this.item.user[i]
        this.$set(u, 'check', []);
        for (let j = 0; j < this.item.top.length; j++) {
          let index = utils.find(u.authority, this.item.top[j].type)
          if (index == -1)
            u.check.push({
              type: u.authority[j],
              check: false
            })
          else u.check.push({
            type: u.authority[j],
            check: true
          })
        }
       // this.$set(this.item.user, i, u);
      },
      checkChange(i, j) {
        let name = '\'' + this.item.top[j].name + '\''
        if (!this.item.user[i].check[j].check) {
          request.RemoveAuthority({
            id: this.$route.params.id,
            uid: this.item.user[i].uid,
            AuthorizeType: this.item.top[j].type
          }).then(r => {
            if (r.data.success) {
              this.$message.success({
                title: '成功',
                message: '删除' + name + '权限成功'
              });
            } else {
              this.$message.error({
                title: '失败',
                message: '删除' + name + '权限失败'
              });
            }
          })
        } else {
          request.AssignAuthority({
            id: this.$route.params.id,
            uid: this.item.user[i].uid,
            AuthorizeType: [this.item.top[j].type]
          }).then(r => {
            if (r.data.success) {
              this.$message.success({
                title: '成功',
                message: '添加' + name + '权限成功'
              });
            } else {
              this.$message.error({
                title: '失败',
                message: '添加' + name + '权限失败'
              });
            }
          })
        }
      },
      addClick() {
        if (this.selectedUsers.length == 0) {
          request.GetAll().then(r => {
            this.selectedUsers = r.data.result.items
            this.dialogFormVisible = true
          })
        } else {
          this.dialogFormVisible = true
        }
      },
      handleView(index, row) {
        request.AssignAuthority({
          id: this.$route.params.id,
          uid: row.id,
          AuthorizeType: ['View']
        }).then(r => {
          if (r.data.success) {
            this.$message.success({
              title: '成功',
              message: '添加View权限成功'
            });
            this.updateList({
              uid: row.id,
              authority: ['View'],
              name: row.name
            });
          } else {
            this.$message.error({
              title: '失败',
              message: '添加View权限失败'
            });
          }
        })
      },
      handleAll(index, row) {
        let data = this.getAllNeededAuthority();
        request.AssignAuthority({
          id: this.$route.params.id,
          uid: row.id,
          AuthorizeType: data
        }).then(r => {
          if (r.data.success) {
            this.$message.success({
              title: '成功',
              message: '添加权限成功'
            });
            this.updateList({
              uid: row.id,
              authority: data,
              name: row.name
            });
          } else {
            this.$message.error({
              title: '失败',
              message: '添加权限失败'
            });
          }
        })
      },
      updateList(data) {
        let index = utils.find(this.item.user, data.uid, x => x.uid);
        if (index == -1) {
          index = this.item.user.length;
          this.item.user.push(data);
        } else {
          utils.union(this.item.user[index].authority, data.authority);
        }
        this.initDataLine(index);
      },
      getAllNeededAuthority(){
        let data = [];
        for (let i = 0; i < this.item.top.length; i++) {
          if (!this.item.top[i].exclusive)
            data.push(this.item.top[i].type);
        }
        return data;
      }
    }
  }
</script>

<style>
  .asign-box>div {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
