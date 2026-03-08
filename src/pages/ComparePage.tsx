import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { ServiceCompare } from '@/components/exam/ExamFeatures';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function ComparePage() {
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
              <BreadcrumbPage>Compare Services</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ServiceCompare />
    </PageLayout>
  );
}
