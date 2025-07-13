
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/context/i18n';
import { CheckCircle, FileText, Globe, Handshake, Plane, ShieldCheck, UserCheck, Award, FileUp, Sparkles, Loader2, Users, FileBadge, Box, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { checkExporterEligibility, CheckExporterEligibilityInput, CheckExporterEligibilityOutput } from '@/ai/flows/check-exporter-eligibility-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';


export default function ExportPartnerPage() {
    const { t } = useI18n();
    const { toast } = useToast();
    const { user } = useAuth();
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
    const [eligibilityResult, setEligibilityResult] = useState<CheckExporterEligibilityOutput | null>(null);

    const benefits = [
        { icon: Globe, title: "benefit_1_title", description: "benefit_1_desc" },
        { icon: ShieldCheck, title: "benefit_2_title", description: "benefit_2_desc" },
        { icon: Handshake, title: "benefit_3_title", description: "benefit_3_desc" },
    ];

    const howItWorks = [
        { icon: Users, title: "exporter_step_1_title", description: "exporter_step_1_desc" },
        { icon: Award, title: "exporter_step_2_title", description: "exporter_step_2_desc" },
        { icon: FileUp, title: "exporter_step_3_title", description: "exporter_step_3_desc" },
        { icon: Plane, title: "exporter_step_4_title", description: "exporter_step_4_desc" },
    ];

    const exportRequirements = [
        { icon: ThumbsUp, title: "export_req_1_title", description: "export_req_1_desc" },
        { icon: FileBadge, title: "export_req_2_title", description: "export_req_2_desc" },
        { icon: Box, title: "export_req_3_title", description: "export_req_3_desc" },
    ];
    
    // Simulating file upload
    const handleFileUpload = (docType: string) => {
        if (!uploadedFiles.includes(docType)) {
            setUploadedFiles([...uploadedFiles, docType]);
            toast({
                title: t('document_uploaded_title', 'Document Uploaded'),
                description: t('document_uploaded_desc', `Document '{{docType}}' has been successfully uploaded.`, { docType }),
            });
        }
    };

    const handleCheckEligibility = async () => {
        setIsCheckingEligibility(true);
        setEligibilityResult(null);

        // In a real app, this data might come from the user's profile.
        // The role is passed from the auth context for validation on the "backend".
        const userData: CheckExporterEligibilityInput = {
            producerName: user?.name || "Anonymous User",
            successfulAuctions: 7, // Example value, meets the requirement
            uploadedDocuments: uploadedFiles,
            requestingRole: user?.role || 'bidder', // Pass role for backend validation
        };

        try {
            const result = await checkExporterEligibility(userData);
            setEligibilityResult(result);
        } catch (error) {
            console.error("Error checking eligibility:", error);
            const errorMessage = error instanceof Error ? error.message : t('ai_check_error_desc', 'Failed to check eligibility with AI. Please try again.');
            toast({
                variant: 'destructive',
                title: t('error'),
                description: errorMessage,
            });
        } finally {
            setIsCheckingEligibility(false);
        }
    }
    
    const getResultVariant = (status: string | undefined) => {
        if (status === 'eligible') return 'default';
        if (status === 'not_eligible') return 'destructive';
        return 'default';
    };


    return (
        <div className="container mx-auto max-w-5xl px-4 py-8 md:py-16">
            <section className="text-center">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <Plane className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-headline">{t('export_partner_program_title')}</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{t('export_partner_program_subtitle')}</p>
            </section>

            <section className="py-16">
                <h2 className="text-3xl font-bold text-center font-headline">{t('why_join_title')}</h2>
                <p className="text-center text-muted-foreground mt-2 mb-12">{t('why_join_subtitle')}</p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {benefits.map((benefit, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <benefit.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-xl">{t(benefit.title as any)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t(benefit.description as any)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="py-16 bg-secondary/50 rounded-xl">
                 <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-center font-headline">{t('how_it_works_title_export')}</h2>
                    <p className="text-center text-muted-foreground mt-2 mb-12">{t('how_it_works_subtitle_exporter')}</p>
                    <div className="relative">
                        <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
                        {howItWorks.map((step, index) => (
                            <div key={index} className={`flex md:items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="bg-primary/10 p-4 rounded-full border-4 border-background">
                                        <step.icon className="h-10 w-10 text-primary" />
                                    </div>
                                </div>
                                <Card className="w-full md:w-1/2">
                                     <CardHeader>
                                        <div className="flex md:hidden items-center gap-4 mb-2">
                                            <div className="bg-primary/10 p-3 rounded-full"><step.icon className="h-8 w-8 text-primary" /></div>
                                            <CardTitle className="font-headline text-xl">{t(step.title as any)}</CardTitle>
                                        </div>
                                        <CardTitle className="font-headline text-xl hidden md:block">{t(step.title as any)}</CardTitle>
                                     </CardHeader>
                                     <CardContent>
                                        <p className="text-muted-foreground">{t(step.description as any)}</p>
                                     </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <h2 className="text-3xl font-bold text-center font-headline">{t('export_product_requirements_title')}</h2>
                <p className="text-center text-muted-foreground mt-2 mb-12">{t('export_product_requirements_subtitle')}</p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {exportRequirements.map((req, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <req.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-xl">{t(req.title as any)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t(req.description as any)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
            
            <section id="apply" className="py-16 text-center">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold font-headline">{t('ready_to_become_exporter_title', 'Ready to Become an Exporter?')}</CardTitle>
                        <CardDescription>{t('upload_documents_and_check_eligibility', 'Upload your legal documents and use our AI assistant to check your eligibility.')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                             <h3 className="text-lg font-semibold mb-4 text-left">{t('upload_legal_documents_title', 'Upload Legal Documents (PDF only)')}</h3>
                             <div className="grid sm:grid-cols-3 gap-4">
                                <Button variant={uploadedFiles.includes('legal_entity_deed') ? 'default' : 'outline'} onClick={() => handleFileUpload('legal_entity_deed')}>
                                    <FileText className="mr-2 h-4 w-4" /> {t('legal_entity_deed', 'Legal Entity Deed')} {uploadedFiles.includes('legal_entity_deed') && <CheckCircle className="ml-2 h-4 w-4" />}
                                </Button>
                                <Button variant={uploadedFiles.includes('npwp') ? 'default' : 'outline'} onClick={() => handleFileUpload('npwp')}>
                                    <FileText className="mr-2 h-4 w-4" /> {t('npwp', 'Tax ID (NPWP)')} {uploadedFiles.includes('npwp') && <CheckCircle className="ml-2 h-4 w-4" />}
                                </Button>
                                <Button variant={uploadedFiles.includes('siup') ? 'default' : 'outline'} onClick={() => handleFileUpload('siup')}>
                                    <FileText className="mr-2 h-4 w-4" /> {t('siup', 'Business License (SIUP)')} {uploadedFiles.includes('siup') && <CheckCircle className="ml-2 h-4 w-4" />}
                                </Button>
                             </div>
                        </div>

                        <div className="border-t pt-6 space-y-4">
                            <Button size="lg" onClick={handleCheckEligibility} disabled={isCheckingEligibility || !user}>
                                {isCheckingEligibility ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : (
                                    <Sparkles className="mr-2 h-5 w-5" />
                                )}
                                {t('check_eligibility_with_ai', 'Check Eligibility with AI')}
                            </Button>
                            {!user && <p className="text-xs text-muted-foreground">{t('log_in_to_check_eligibility', 'You must be logged in to check eligibility.')}</p>}
                            
                            {eligibilityResult && (
                                <Alert variant={getResultVariant(eligibilityResult.status)}>
                                    <AlertTitle className="font-bold flex items-center gap-2">
                                        {t('eligibility_status', 'Eligibility Status')}: 
                                        <Badge variant={getResultVariant(eligibilityResult.status)}>{t(eligibilityResult.status, eligibilityResult.status)}</Badge>
                                    </AlertTitle>
                                    <AlertDescription className="mt-2 text-left space-y-2">
                                       <p><span className="font-semibold">{t('recommendation', 'Recommendation')}:</span> {eligibilityResult.recommendation}</p>
                                       <p><span className="font-semibold">{t('notes', 'Notes')}:</span> {eligibilityResult.notes}</p>
                                       {eligibilityResult.missingDocuments && eligibilityResult.missingDocuments.length > 0 && (
                                           <div>
                                               <p className="font-semibold">{t('missing_documents', 'Missing Documents')}:</p>
                                               <ul className="list-disc pl-5">
                                                   {eligibilityResult.missingDocuments.map((doc, i) => <li key={i}>{t(doc, doc)}</li>)}
                                               </ul>
                                           </div>
                                       )}
                                    </AlertDescription>
                                </Alert>
                            )}

                        </div>

                        <div className="border-t pt-6">
                             <Button asChild size="lg" disabled={eligibilityResult?.status !== 'eligible'}>
                                <Link href="/dashboard/admin">
                                    {t('submit_for_admin_verification', 'Submit for Admin Verification')}
                                </Link>
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2">{t('submit_for_admin_verification_desc', 'Once eligible, you can submit your application for final review by the admin.')}</p>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
