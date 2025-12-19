import { dbHelpers } from '../../lib/db';
import { parse } from 'cookie';

function isAuthenticated(req) {
  const cookies = parse(req.headers.cookie || '');
  return cookies.admin_session === 'authenticated';
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { slug, featured } = req.query;
      
      if (slug) {
        const project = dbHelpers.getProjectBySlug(slug);
        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }
        
        // Parse JSON fields
        project.gallery_images = project.gallery_images 
          ? JSON.parse(project.gallery_images) 
          : [];
        project.technologies = project.technologies 
          ? JSON.parse(project.technologies) 
          : [];
        
        return res.status(200).json(project);
      }
      
      const featuredOnly = featured === 'true';
      const projects = dbHelpers.getAllProjects(featuredOnly ? true : null);
      
      // Parse JSON fields for all projects
      const parsedProjects = projects.map((project) => ({
        ...project,
        gallery_images: project.gallery_images 
          ? JSON.parse(project.gallery_images) 
          : [],
        technologies: project.technologies 
          ? JSON.parse(project.technologies) 
          : [],
      }));
      
      return res.status(200).json(parsedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const result = dbHelpers.createProject(req.body);
      return res.status(201).json({ id: result.lastInsertRowid, ...req.body });
    } catch (error) {
      console.error('Error creating project:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'PUT') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Project ID required' });
      }
      
      dbHelpers.updateProject(parseInt(id), req.body);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating project:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'DELETE') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Project ID required' });
      }
      
      dbHelpers.deleteProject(parseInt(id));
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting project:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

