import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import ArchitectureMap from '@/components/map/ArchitectureMap';
import ServicePanel from '@/components/panels/ServicePanel';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function PipelineExplorer() {
  return (
    <PageLayout>
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="px-6 py-3 border-b border-border">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pipeline Explorer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-xs text-muted-foreground mt-1">
            Zoomable architecture map — click any service node to learn more
          </p>
        </div>
        <div className="flex-1">
          <ArchitectureMap />
        </div>
      </div>
      <ServicePanel />
    </PageLayout>
  );
}
