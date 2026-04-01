-- Improve handle_new_user function with input validation and error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_display_name TEXT;
BEGIN
  -- Extract and validate display_name
  v_display_name := new.raw_user_meta_data ->> 'display_name';
  
  -- Truncate if too long (max 100 characters)
  IF v_display_name IS NOT NULL AND length(v_display_name) > 100 THEN
    v_display_name := substring(v_display_name, 1, 100);
  END IF;
  
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (new.id, v_display_name);
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log warning but don't block user signup
    RAISE WARNING 'Failed to create profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$;