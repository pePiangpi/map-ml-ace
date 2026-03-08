import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { MockExam } from '@/components/exam/ExamFeatures';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function ExamPage() {
  return (
    <PageLayout>
      <div className="px-6 py-3 border-b border-border max-w-4xl mx-auto w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Mock Exam</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <MockExam />
    </PageLayout>
  );
}
