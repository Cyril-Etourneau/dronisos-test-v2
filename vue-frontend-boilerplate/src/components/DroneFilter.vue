<template>
    <v-card class="drone-filter" outlined>
        <v-card-title class="py-2">
            <v-btn text class="px-2" @click="isOpen = !isOpen">
                <v-icon left small>
                    {{ isOpen ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
                Filters
            </v-btn>
            <v-spacer />
            <v-chip v-if="activeFilterCount > 0" small>
                {{ activeFilterCount }} active
            </v-chip>
        </v-card-title>

        <v-expand-transition>
            <div v-show="isOpen">
                <v-divider />
                <v-card-text class="drone-filter-fields">
                    <v-text-field
                        v-model="localFilter.name"
                        label="Filter by drone name"
                        clearable
                        outlined
                        dense
                        hide-details="auto"
                    />

                    <v-select
                        v-model="localFilter.status"
                        :items="statusOptions"
                        label="Filter by status"
                        multiple
                        chips
                        clearable
                        outlined
                        dense
                        hide-details="auto"
                        :menu-props="{
                            offsetY: true,
                            maxHeight: 300,
                            zIndex: 2000,
                        }"
                    />
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { DroneStatus } from "@/drones/status";

export type DroneFilterValue = {
    name: string;
    status: string[];
};

@Component
export default class DroneFilter extends Vue {
    private isOpen = true;

    private localFilter: DroneFilterValue = {
        name: "",
        status: [],
    };

    protected get activeFilterCount(): number {
        const hasName = this.localFilter.name.trim().length > 0;
        const hasStatus = this.localFilter.status.length > 0;
        return Number(hasName) + Number(hasStatus);
    }

    protected get statusOptions(): string[] {
        return Object.values(DroneStatus);
    }

    @Watch("localFilter", { deep: true })
    private onLocalFilterChanged(nextValue: DroneFilterValue): void {
        this.$emit("change", {
            name: nextValue.name,
            status: [...nextValue.status],
        });
    }
}
</script>

<style scoped>
.drone-filter {
    width: 100%;
}

.drone-filter-fields {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.drone-filter ::v-deep .v-chip.v-size--default {
    height: 24px !important;
    font-size: 12px !important;
}
</style>
