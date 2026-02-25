import { useState } from "react";
import { Search, Filter, GraduationCap, Award } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DoctorCard from "@/components/DoctorCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDoctors } from "@/data/mockData";

const DoctorListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [qualificationFilter, setQualificationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const specialties = [...new Set(mockDoctors.map((d) => d.specialty))];

  const filteredDoctors = mockDoctors
    .filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = specialtyFilter === "all" || d.specialty === specialtyFilter;
      const matchesQualification =
        qualificationFilter === "all" ||
        (qualificationFilter === "phd" && d.qualification.includes("Ph.D")) ||
        (qualificationFilter === "md" && d.qualification.includes("MD"));
      return matchesSearch && matchesSpecialty && matchesQualification;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "fee-low") return a.fee - b.fee;
      return b.reviews - a.reviews;
    });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Find Your Doctor</h1>
          <p className="text-muted-foreground font-body mt-1">
            Browse our expert homeopathic practitioners and book a consultation
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-body bg-secondary/50"
              />
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="font-body bg-secondary/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={qualificationFilter} onValueChange={setQualificationFilter}>
              <SelectTrigger className="font-body bg-secondary/50">
                <GraduationCap className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Qualifications</SelectItem>
                <SelectItem value="phd">Ph.D Holders</SelectItem>
                <SelectItem value="md">MD (Homeopathy)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="font-body bg-secondary/50">
                <Award className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="fee-low">Lowest Fee</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-body">
          Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
        </p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body text-lg">No doctors found matching your criteria.</p>
            <p className="text-muted-foreground font-body text-sm mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DoctorListing;
