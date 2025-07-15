
'use client';

import { useI18n } from '@/context/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const sopSteps = [
    { step: 1, title: 'sop_step_1_title', description: 'sop_step_1_desc' },
    { step: 2, title: 'sop_step_2_title', description: 'sop_step_2_desc' },
    { step: 3, title: 'sop_step_3_title', description: 'sop_step_3_desc' },
    { step: 4, title: 'sop_step_4_title', description: 'sop_step_4_desc' },
    { step: 5, title: 'sop_step_5_title', description: 'sop_step_5_desc' },
    { step: 6, title: 'sop_step_6_title', description: 'sop_step_6_desc' },
    { step: 7, title: 'sop_step_7_title', description: 'sop_step_7_desc' },
];

const documentChecklist = [
    { document: 'doc_checklist_1_doc', purpose: 'doc_checklist_1_purpose' },
    { document: 'doc_checklist_2_doc', purpose: 'doc_checklist_2_purpose' },
    { document: 'doc_checklist_3_doc', purpose: 'doc_checklist_3_purpose' },
    { document: 'doc_checklist_4_doc', purpose: 'doc_checklist_4_purpose' },
    { document: 'doc_checklist_5_doc', purpose: 'doc_checklist_5_purpose' },
    { document: 'doc_checklist_6_doc', purpose: 'doc_checklist_6_purpose' },
    { document: 'doc_checklist_7_doc', purpose: 'doc_checklist_7_purpose' },
]

export default function SopForeignBuyerPage() {
    const { t } = useI18n();

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8 md:py-16">
            <section className="text-center mb-16">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <FileText className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-headline">{t('sop_foreign_buyer_title')}</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{t('sop_foreign_buyer_subtitle')}</p>
            </section>

            <div className="grid lg:grid-cols-2 gap-12">
                <section>
                    <h2 className="text-3xl font-bold font-headline mb-6">{t('sop_steps_title')}</h2>
                    <div className="relative pl-8">
                        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border -translate-x-1/2"></div>
                        {sopSteps.map((item, index) => (
                            <div key={index} className="relative flex items-start gap-6 mb-8">
                                <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                    {item.step}
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="font-semibold text-lg">{t(item.title)}</h3>
                                    <p className="text-muted-foreground text-sm">{t(item.description)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold font-headline mb-6">{t('doc_checklist_title')}</h2>
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('document', 'Document')}</TableHead>
                                        <TableHead>{t('purpose', 'Purpose')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documentChecklist.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{t(item.document)}</TableCell>
                                            <TableCell className="text-muted-foreground">{t(item.purpose)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
