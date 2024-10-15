<template>
    <!-- Main -->
    <div class="p-2">
        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">Deleted Blog Management</h2>
            </div>
        </div>

        <!-- Content -->
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Blogs / Deleted-list</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>status</th>
                                        <th>title</th>
                                        <th>image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="deletedBlog in deletedBlogs" class="cursor-pointer"
                                        @click.prevent="visitBlog(blog.id)">
                                        <td>
                                            <span v-if="deletedBlog.status == 1" class="badge badge-success">Published</span>
                                            <span v-if="deletedBlog.status == 0" class="badge badge-secondary">Disabled</span>
                                        </td>
                                        <td>{{ deletedBlog.title }}</td>
                                        <td>{{ deletedBlog.image_id }}</td>
                                        <td>
                                            <div class="" @click.prevent="confirmRecovery(deletedBlog.id)">
                                                <i class="bi bi-bootstrap-reboot text-success fs-6"></i>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="recoveryBlog" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click.prevent="closeRecoveryModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to recovery this blog?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeRecoveryModal">Close</button>
                    <button type="button" class="btn btn-danger" @click.prevent="recoveryBlog()">recovery</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const deletedList = ref({});
const deletedBlogs = ref({});
const deletedBlogId = ref(0);

const closeCreateModal = () => {
    $('#createCategory').modal('hide');
}

const closeEditModal = () => {
    $('#getJob').modal('hide');
}

const getDeletedList = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/deleted/all');
        deletedBlogs.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const confirmRecovery = async (id) => {
    try {
        $('#recoveryBlog').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/deleted/get/${id}`);
        console.log('response', response);
        deletedBlogId.value = response.data.id;
    } catch (error) {
        errorMessage(error);
    }
}

const recoveryBlog = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/recovery/${deletedBlogId.value}`);
        $('#recoveryBlog').modal('hide');
        successMessage('Job Recovery successfully');
        getDeletedList();
    } catch (error) {
        errorMessage(error);
    }
}

const successMessage = (title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Toast.fire({
        icon: "success",
        title: title
    });
};

const errorMessage = (title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Toast.fire({
        icon: "error",
        title: title
    });
};

const closeRecoveryModal = () => {
    $('#recoveryBlog').modal('hide');
}

onMounted(() => {
    getDeletedList();
});
</script>