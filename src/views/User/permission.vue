<template>
    <div class="shadow card">
        <div class="card-body">
            <div id="basic-info">
                <div class="ps-0 card-header">
                    <div class="d-flex align-items-center justify-items-center">
                        <h5>Permissions Settings</h5>
                        <div class="form-check">
                            <input class="form-check-input" hidden type="checkbox" id="selectAllCheckbox"
                                v-model="selectAll" @change="toggleAllCheckboxes">
                            <label class="form-check-label pt-0 mt-0" @click="toggleAllCheckboxes"
                                for="selectAllCheckbox">
                                <span v-if="selectAll">
                                    <i class="bi bi-toggle-on text-success toggle-icon-size pt-0 mt-0"></i>
                                </span>
                                <span v-else>
                                    <i class="bi bi-toggle-off toggle-icon-size pt-0 mt-0"></i>
                                </span>
                            </label>
                        </div>
                    </div>

                </div>
                <div class="pt-2 mt-3">
                    <form role="form text-left" @submit.prevent="updateUserPermission">
                        <div class="mb-1 row">
                            <div class="mb-2 col-md-6" v-for="group in groups" :key="group.group_name"
                                :class="rowClass">
                                <div class="shadow-sm card">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            {{
                                                group.group_name
                                            }}
                                        </h5>
                                        <ul class="list-group" v-for="permission in permissions" :key="permission.id"
                                            :class="list">
                                            <li class="list-group-item mb-2"
                                                v-if="permission.group_name == group.group_name">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input mt-0" type="checkbox"
                                                        v-model="user_permissions" :id="permission.name"
                                                        :key="permission.name" :value="permission.name">
                                                    <label class="form-check-label ml-1" :for="permission.name">
                                                        {{ formatPermissionName(permission.name) }}
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-light-info mt-4 fw-bold"
                                        :disabled="user.deleted_at != null" data-toggle="tooltip"
                                        data-placement="bottom" title="Save changes">
                                        UPDATE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Link, router, usePage } from "@inertiajs/vue3";
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

const { props } = usePage();
const userId = props.user.id;

const validationErrors = ref({});
const validationMessage = ref(null);

const user = ref({});
const edit_user = ref({});
const groups = ref([]);
const permissions = ref([]);
const user_permissions = ref([]);
const selectAll = ref(false);

onMounted(() => {
    initData();
})


function resetValidationErrors() {
    validationErrors.value = {};
    validationMessage.value = null;
}
function convertValidationNotification(err) {
    resetValidationErrors();
    if (!(err.response && err.response.data)) return;
    const { message } = err.response.data;
    errorMessage(message);
}
function convertValidationError(err) {
    resetValidationErrors();
    if (!(err.response && err.response.data)) return;
    const { message, errors } = err.response.data;
    validationMessage.value = message;

    if (errors) {
        for (const error in errors) {
            validationErrors.value[error] = errors[error][0];
        }
    }
}

const successMessage = (message) => {
    Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
    });
};
const errorMessage = (message) => {
    Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
    });
};



const toggleAllCheckboxes = () => {
    user_permissions.value = selectAll.value ? permissions.value.map(permission => permission.name) : [];
};

async function initData() {
    getUser();
    userPermissions();
    getPermissions();
    getPermissionGroup();
}

async function getUser() {
    const response = (
        await axios.get(route("user.get", userId))
    ).data;
    user.value = response.data;
}
async function updateUserPermission() {

    resetValidationErrors();
    try {
        await axios.post(
            route("permission.user.update", userId),
            {
                permissions: user_permissions.value,
            }
        );
        successMessage("User Permissions Updated Successfully");
        initData();
        window.location.reload();
    } catch (error) {
        convertValidationError(error);
    }

}
async function getPermissionGroup() {
    const response = (
        await axios.get(
            route("permission.group.all")
        )
    ).data;
    groups.value = response;
    checkSelectAll();
}
async function getPermissions() {
    const response = (
        await axios.get(
            route("permission.list.all")
        )
    ).data;
    permissions.value = response;
}
async function userPermissions() {
    const response = (
        await axios.get(
            route("permission.user.all", userId)
        )
    ).data;
    user_permissions.value = response;
}

function checkSelectAll() {
    if (user_permissions.value.length !== 0 && permissions.value.length !== 0 && user_permissions.value.length === permissions.value.length) {
        selectAll.value = true;
    }
}

function formatPermissionName(name) {
    return name.replace(/_/g, ' ')
        .replace(/\bGrns\b/gi, 'GRNs')
        .replace(/\bUoms\b/gi, 'UOMs')
        .replace(/\b\w/g, char => char.toUpperCase());
}

</script>

<style lang="scss" scoped>
.toggle-icon-size {
    font-size: 2rem;
}
</style>
