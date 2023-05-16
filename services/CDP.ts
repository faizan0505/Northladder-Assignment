import { CustomerProfile } from "../models/customerProfile";
import { v4 as uuidv4 } from "uuid";

export class CustomerDataPlatform {
  private customerProfiles: CustomerProfile[];

  constructor() {
    this.customerProfiles = [];
  }

  addCustomerProfile(profile: CustomerProfile): CustomerProfile {
    // Generate a unique ID for the new profile
    const newProfile: CustomerProfile = {
      ...profile,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.customerProfiles.push(newProfile);
    return newProfile;
  }

  getCustomerProfileFromId(id: string): CustomerProfile | undefined {
    return this.customerProfiles.find((profile) => profile.id === id);
  }

  updateTag(id: string, tags: string[]): CustomerProfile | undefined {
    const profile = this.customerProfiles.find((profile) => profile.id === id);
    if (profile) {
      profile.tags = tags;
      profile.updatedAt = new Date();
    }
    return profile;
  }

  updateCustomerProfile(
    updatedProfile: CustomerProfile
  ): CustomerProfile | undefined {
    const existingProfile = this.customerProfiles.find(
      (profile) => profile.id === updatedProfile.id
    );

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

  deleteCustomerProfile(profileId: string): void {
    this.customerProfiles = this.customerProfiles.filter(
      (profile) => profile.id !== profileId
    );
  }

  listCustomerProfiles(
    filters: Partial<CustomerProfile> = {},
    limit?: number,
    page?: number,
    search?: string
  ): CustomerProfile[] {
    let filteredProfiles = this.customerProfiles.filter((profile) =>
      this.matchesFilter(profile, filters)
    );

    if (search) {
      filteredProfiles = filteredProfiles.filter((profile) =>
        this.matchesSearch(profile, search)
      );
    }

    if (limit && page) {
      const startIndex = (page - 1) * limit;
      filteredProfiles = filteredProfiles.slice(startIndex, startIndex + limit);
    }

    return filteredProfiles;
  }

  updateTags(
    profileId: string,
    tags: string[],
    removeTags = false
  ): CustomerProfile | undefined {
    const profile = this.customerProfiles.find(
      (profile) => profile.id === profileId
    );

    if (profile) {
      if (removeTags) {
        profile.tags = profile.tags?.filter((tag) => !tags.includes(tag));
      } else {
        profile.tags = [...(profile.tags || []), ...tags];
      }
      profile.updatedAt = new Date();
    }

    return profile;
  }

  getCustomerProfilesByTags(
    tags: string[],
    allTags = false
  ): CustomerProfile[] {
    return this.customerProfiles.filter((profile) =>
      allTags
        ? this.matchesAllTags(profile, tags)
        : this.matchesAnyTag(profile, tags)
    );
  }

  private matchesFilter(
    profile: CustomerProfile,
    filters: Partial<CustomerProfile>
  ): boolean {
    for (const key in filters) {
      if (
        filters.hasOwnProperty(key) &&
        profile.hasOwnProperty(key) &&
        profile[key as keyof CustomerProfile] !==
          filters[key as keyof CustomerProfile]
      ) {
        return false;
      }
    }
    return true;
  }

  private matchesSearch(profile: CustomerProfile, search: string): boolean {
    const searchTerm = search.toLowerCase();

    return (
      profile.firstName.toLowerCase().includes(searchTerm) ||
      profile.lastName.toLowerCase().includes(searchTerm) ||
      profile.email.toLowerCase().includes(searchTerm)
    );
  }

  private matchesAnyTag(profile: CustomerProfile, tags: string[]): boolean {
    if (!profile.tags) {
      return false;
    }
    return tags.some((tag) => profile.tags?.includes(tag));
  }

  private matchesAllTags(profile: CustomerProfile, tags: string[]): boolean {
    if (!profile.tags) {
      return false;
    }
    return tags.every((tag) => profile.tags?.includes(tag));
  }
}
