"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDataPlatform = void 0;
const uuid_1 = require("uuid");
class CustomerDataPlatform {
    constructor() {
        this.customerProfiles = [];
    }
    addCustomerProfile(profile) {
        // Generate a unique ID for the new profile
        const newProfile = Object.assign(Object.assign({}, profile), { id: (0, uuid_1.v4)(), createdAt: new Date(), updatedAt: new Date() });
        this.customerProfiles.push(newProfile);
        return newProfile;
    }
    getCustomerProfileFromId(id) {
        return this.customerProfiles.find((profile) => profile.id === id);
    }
    updateTag(id, tags) {
        const profile = this.customerProfiles.find((profile) => profile.id === id);
        if (profile) {
            profile.tags = tags;
            profile.updatedAt = new Date();
        }
        return profile;
    }
    updateCustomerProfile(updatedProfile) {
        const existingProfile = this.customerProfiles.find((profile) => profile.id === updatedProfile.id);
        if (existingProfile) {
            // Update the profile with the new values
            existingProfile.firstName = updatedProfile.firstName;
            existingProfile.lastName = updatedProfile.lastName;
            existingProfile.email = updatedProfile.email;
            existingProfile.phone = updatedProfile.phone;
            existingProfile.address = updatedProfile.address;
            existingProfile.updatedAt = new Date();
        }
        return existingProfile || undefined;
    }
    deleteCustomerProfile(profileId) {
        this.customerProfiles = this.customerProfiles.filter((profile) => profile.id !== profileId);
    }
    listCustomerProfiles(filters = {}, limit, page, search) {
        let filteredProfiles = this.customerProfiles.filter((profile) => this.matchesFilter(profile, filters));
        if (search) {
            filteredProfiles = filteredProfiles.filter((profile) => this.matchesSearch(profile, search));
        }
        if (limit && page) {
            const startIndex = (page - 1) * limit;
            filteredProfiles = filteredProfiles.slice(startIndex, startIndex + limit);
        }
        return filteredProfiles;
    }
    updateTags(profileId, tags, removeTags = false) {
        var _a;
        const profile = this.customerProfiles.find((profile) => profile.id === profileId);
        if (profile) {
            if (removeTags) {
                profile.tags = (_a = profile.tags) === null || _a === void 0 ? void 0 : _a.filter((tag) => !tags.includes(tag));
            }
            else {
                profile.tags = [...(profile.tags || []), ...tags];
            }
            profile.updatedAt = new Date();
        }
        return profile;
    }
    getCustomerProfilesByTags(tags, allTags = false) {
        return this.customerProfiles.filter((profile) => allTags
            ? this.matchesAllTags(profile, tags)
            : this.matchesAnyTag(profile, tags));
    }
    matchesFilter(profile, filters) {
        for (const key in filters) {
            if (filters.hasOwnProperty(key) &&
                profile.hasOwnProperty(key) &&
                profile[key] !==
                    filters[key]) {
                return false;
            }
        }
        return true;
    }
    matchesSearch(profile, search) {
        const searchTerm = search.toLowerCase();
        return (profile.firstName.toLowerCase().includes(searchTerm) ||
            profile.lastName.toLowerCase().includes(searchTerm) ||
            profile.email.toLowerCase().includes(searchTerm));
    }
    matchesAnyTag(profile, tags) {
        if (!profile.tags) {
            return false;
        }
        return tags.some((tag) => { var _a; return (_a = profile.tags) === null || _a === void 0 ? void 0 : _a.includes(tag); });
    }
    matchesAllTags(profile, tags) {
        if (!profile.tags) {
            return false;
        }
        return tags.every((tag) => { var _a; return (_a = profile.tags) === null || _a === void 0 ? void 0 : _a.includes(tag); });
    }
}
exports.CustomerDataPlatform = CustomerDataPlatform;
