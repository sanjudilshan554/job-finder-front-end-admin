<template>
    <!-- Main -->
    <div class="p-2">

        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">Blog Tag management</h2>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary text-end" data-bs-toggle="modal"
                    data-bs-target="#createTag" data-whatever="@mdo">
                    <i class="bi bi-plus-square"></i>   Create
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Blog / Tags</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr> 
                                        <th>name</th>
                                        <th>slug</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="tag in jobs" class="cursor-pointer">
                                        <td>{{ tag.name }}</td>
                                        <td>{{ tag.slug }}</td>
                                        <td class="d-flex">
                                            <div class="" @click.prevent="editTag(tag.id)"><i
                                                    class="bi bi-pencil"></i></div>
                                            <div class="" @click.prevent="confirmDelete(tag.id)"><i
                                                    class="bi bi-trash ps-2 text-danger"></i></div>
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

    <!-- Create Modal -->
    <div class="modal fade" id="createTag" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New tag</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click="closeCreateModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createTag">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="tag.name">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click="closeCreateModal">Close</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" id="editTag" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New tag</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="updateTag(tagData.id)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="tagData.name">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="deleteJob" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click.prevent="closeDeleteModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete this tag?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeDeleteModal">Close</button>
                    <button type="button" class="btn btn-danger" @click.prevent="deleteJob(tagData.id)">delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import axios from 'axios'
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Multiselect from 'vue-multiselect';
import { useRouter } from 'vue-router';
const router = useRouter();

const tag = ref({});
const jobs = ref([]);
const tagData = ref({});
const jobCategories = ref([]);

const jobTypes = [
    {id:1, name:'Full Time'},
    {id:2, name:'Part Time'},
    {id:3, name:'Remote'},
    {id:4, name:'Freelance'}, 
];

const createTag = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/blog/tag/store', tag.value);
        closeCreateModal();
        clearVariables();
        successMessage('Job created successfully');
        getTags();
    } catch (error) {
        errorMessage(error);
    }
}

const getActivatedCategories = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/category/all-enabled');
        jobCategories.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const closeCreateModal = () => {
    $('#createTag').modal('hide');
}

const closeEditModal = () => {
    $('#editTag').modal('hide');
}

const getTags = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/tag/all');
        jobs.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const editTag = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/tag/get/${id}`);
        tagData.value = response.data;
        $('#editTag').modal('show');
    } catch (error) {
        errorMessage(error);
    }
}

const updateTag = async (id) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/tag/update/${id}`, tagData.value);
        $('#editTag').modal('hide');
        successMessage('Job updated successfully');
        getTags();
    } catch (error) {
        errorMessage(error);
    }
}

const confirmDelete = async (id) => {
    try {
        $('#deleteJob').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/tag/get/${id}`);
        tagData.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const deleteJob = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/blog/tag/delete/${id}`);
        $('#deleteJob').modal('hide');
        successMessage('Job deleted successfully');
        getTags();
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

const clearVariables = () => {
    tag.value = {};
}

const closeDeleteModal = () => {
    $('#deleteJob').modal('hide');
}

const visitJob = (id) => {
    router.push({ name: 'edit-tag', params: { job_id: id } });
}

onMounted(() => {
    getTags();
    getActivatedCategories();
});
</script>