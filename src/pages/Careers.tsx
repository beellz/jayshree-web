import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, Building2, ChevronRight, Search, Paperclip, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useJobs, Job } from "@/hooks/useJobs";
import { useCompanies } from "@/hooks/useCompanies";
import { toast } from "sonner";

// EmailJS Configuration - Replace with your actual IDs
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const Careers = () => {
  const { data: jobs = [], isLoading } = useJobs();
  const { data: companies = [] } = useCompanies();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = selectedCompany === "all" || job.company_id === selectedCompany;
    return matchesSearch && matchesCompany;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      setResumeFile(file);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    if (formRef.current) {
      const fileInput = formRef.current.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsApplying(true);
    const formData = new FormData(e.currentTarget);

    try {
      const templateParams: Record<string, string> = {
        job_title: selectedJob.title,
        company_name: selectedJob.companies?.name || "N/A",
        from_name: formData.get("name") as string,
        from_email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || "Not provided",
        cover_letter: (formData.get("cover_letter") as string) || "Not provided",
        resume_attached: resumeFile ? "Yes - " + resumeFile.name : "No",
      };

      // If you have EmailJS configured, uncomment this:
      // await emailjs.send(
      //   EMAILJS_SERVICE_ID,
      //   EMAILJS_TEMPLATE_ID,
      //   templateParams,
      //   EMAILJS_PUBLIC_KEY
      // );

      console.log("Application submission:", templateParams);

      toast.success("Application submitted successfully!");
      setSelectedJob(null);
      setResumeFile(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-6">
              Join Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Explore career opportunities across our group companies and be part of 
              a dynamic team shaping multiple industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full md:w-64">
                <Building2 className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-card border border-border rounded-lg"
            >
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h2 className="font-display text-2xl text-foreground mb-2">
                No Open Positions
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We don't have any open positions at the moment, but we're always looking 
                for talented individuals. Send us your resume!
              </p>
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-foreground mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {job.companies && (
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {job.companies.name}
                          </span>
                        )}
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                        )}
                        {job.job_type && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.job_type}
                          </span>
                        )}
                      </div>
                      {job.description && (
                        <p className="text-muted-foreground mt-3 line-clamp-2">
                          {job.description}
                        </p>
                      )}
                    </div>
                    <Dialog open={dialogOpen && selectedJob?.id === job.id} onOpenChange={(open) => {
                      setDialogOpen(open);
                      if (!open) {
                        setSelectedJob(null);
                        setResumeFile(null);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button onClick={() => {
                          setSelectedJob(job);
                          setDialogOpen(true);
                        }}>
                          Apply Now
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Apply for {job.title}</DialogTitle>
                          <DialogDescription>
                            {job.companies?.name && `at ${job.companies.name}`}
                          </DialogDescription>
                        </DialogHeader>
                        <form ref={formRef} onSubmit={handleApply} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input id="name" name="name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" name="email" type="email" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" type="tel" />
                          </div>
                          {/* Resume Upload */}
                          <div className="space-y-2">
                            <Label htmlFor="resume">Resume *</Label>
                            <div className="flex items-center gap-4">
                              <label
                                htmlFor="resume"
                                className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent/10 transition-colors"
                              >
                                <Paperclip className="h-4 w-4" />
                                <span className="text-sm">Choose File</span>
                                <input
                                  id="resume"
                                  name="resume"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileChange}
                                  className="hidden"
                                  required
                                />
                              </label>
                              {resumeFile && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-md">
                                  <span className="text-sm text-foreground truncate max-w-[150px]">
                                    {resumeFile.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={removeFile}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              PDF or Word document, max 5MB
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cover_letter">Cover Letter</Label>
                            <Textarea 
                              id="cover_letter" 
                              name="cover_letter" 
                              placeholder="Tell us why you're a great fit..."
                              rows={4}
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={isApplying}>
                            {isApplying ? "Submitting..." : "Submit Application"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl text-foreground mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals to join our growing team. 
              Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Send Your Resume</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
