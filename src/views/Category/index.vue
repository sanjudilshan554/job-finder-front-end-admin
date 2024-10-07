<template>

    <!-- Main -->
    <div class="p-2">

        <!-- Header -->
        <div class="d-flex justify-content-between">
            <div class="text-start">
                <h2 class="fw-bold">Category management</h2>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary text-end" data-bs-toggle="modal"
                    data-bs-target="#createCategory" data-whatever="@mdo">
                    Create
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Categories</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>status</th>
                                        <th>name</th>
                                        <th>slug</th>
                                        <th>description</th>
                                        <th>image</th>
                                        <!-- <th>action</th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="category in categories" class="cursor-pointer">
                                        <td> {{ category.status }}</td>
                                        <td>{{ category.name }}</td>
                                        <td>{{ category.slug }}</td>
                                        <td>{{ category.description }}</td>
                                        <td>{{ category.image_id }}</td>
                                        <td class="d-flex">
                                            <div class=""><i class="bi bi-pencil"></i></div>
                                            <div class=""><i class="bi bi-trash ps-2 text-danger"></i></div>
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

    <!-- Modal -->
    <div class="modal fade" id="createCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeCreateModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createCategory">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="category.name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Image:</label>
                            <input type="file" class="form-control" id="recipient-name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description:</label>
                            <textarea class="form-control" id="message-text" v-model="category.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Status:</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch"
                                    id="flexSwitchCheckDefault">
                                <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox
                                    input</label>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'

const category = ref({});
const categories = ref([]);

const createCategory = async () => {
    try { 
        const response = await axios.post('http://127.0.0.1:8000/api/category/store', category.value);
        closeCreateModal();
    } catch (error) {
        console.log('error', error);
    }
}

const closeCreateModal = () => {
    $('#createCategory').modal('hide') ;
}

const getCategories = async () =>{
    try{
        const response = await axios.get('http://127.0.0.1:8000/api/category/all');
        categories.value = response.data;
        console.log('categories', response.data);
    }catch(error){
        console.log('error', error);
    }
}

onMounted(()=>{
    getCategories();
});
</script>