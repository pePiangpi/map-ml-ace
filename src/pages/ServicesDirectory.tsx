import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { useLearning } from '@/context/LearningContext';
import { servicesData, layerOrder, layerColors, layerServices } from '@/data/servicesData';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Search } from 'lucide-react';

export default function ServicesDirectory() {
  const { mode } = useLearning();
  const [search, setSearch] = useState('');
  const [filterLayer, setFilterLayer] = useState<string | null>(null);

  const allServices = Object.values(servicesData);
  const filtered = allServices.filter(s => {
    const matchesSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.layer.toLowerCase().includes(search.toLowerCase());
    const matchesLayer = !filterLayer || s.layer === filterLayer;
    return matchesSearch && matchesLayer;
  });

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Service Directory</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold text-foreground mb-2">AWS ML Service Directory</h1>
        <p className="text-sm text-muted-foreground mb-6">Browse all {allServices.length} services across the ML lifecycle.</p>

        {/* Search & filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterLayer(null)}
              className={`px-3 py-1.5 text-[10px] rounded-full border transition-colors ${
                !filterLayer ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {layerOrder.map(layer => (
              <button
                key={layer}
                onClick={() => setFilterLayer(filterLayer === layer ? null : layer)}
                className={`px-3 py-1.5 text-[10px] rounded-full border transition-colors ${
                  filterLayer === layer ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((svc, i) => {
            const color = layerColors[svc.layer];
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
              >
                <Link
                  to={`/services/${svc.id}`}
                  className="block p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{svc.name}</h3>
                      <span className="text-[10px] text-muted-foreground">{svc.layer}</span>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {mode === 'simple' ? svc.simple : svc.exam}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-10">No services found matching your search.</p>
        )}
      </div>
    </PageLayout>
  );
}
